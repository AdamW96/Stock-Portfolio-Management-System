package unsw_9900.nobugs.service.realtime;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import unsw_9900.nobugs.mapper.MarketRealtimeMapper;
import unsw_9900.nobugs.mapper.StockInfoMapper;
import unsw_9900.nobugs.po.MarketRealtime;
import unsw_9900.nobugs.po.StockInfo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/11/9
 */
@Service
public class RealtimeStockService {

    private static final Logger logger = LoggerFactory.getLogger(RealtimeStockService.class);
    private static final String SZSE = "SZSE";

    static private SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss", Locale.CHINA);

    @Autowired
    private StockInfoMapper stockInfoMapper;

    @Autowired
    private MarketRealtimeMapper marketRealtimeMapper;

    static class NetStockPrice {
        double price;
        Date tradeTime;

        public NetStockPrice(double price, Date tradeTime) {
            this.price = price;
            this.tradeTime = tradeTime;
        }
    }

    private JsonNode getMarketRealtime(List<String> symbolList) {

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);

        if (symbolList == null) {
            return mapper.createObjectNode();
        }

        String symbols = String.join(",", symbolList);
        String url = "http://api.money.126.net/data/feed/{symbols},money.api".replace("{symbols}", symbols);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate
                .exchange(url, HttpMethod.GET, request, String.class);

        JsonNode json;
        String res;
        try {
            res = Objects.requireNonNull(response.getBody());
            res = StringUtils.delete(res, "_ntes_quote_callback(");
            res = StringUtils.delete(res, ");");
            json = mapper.readTree(res);
        } catch (Exception e) {
            logger.error("error parse json when rest get response={}", response.getBody(), e);
            return mapper.createObjectNode();
        }

        return json;
    }

    private String buildSymbol(StockInfo stockInfo) {
        if (SZSE.equals(stockInfo.getExchange())) {
            return "1" + stockInfo.getSymbol();
        } else {
            return "0" + stockInfo.getSymbol();
        }
    }

    public boolean addRealtimePrice(int sid, Double price, Date tradeTime){
        // TODO 如何判断是新的 price
        MarketRealtime record = new MarketRealtime();
        record.setSid(sid);
        record.setPrice(price);
        record.setTradeTime(tradeTime);
        marketRealtimeMapper.insert(record);
        return true;
    }

    @Scheduled(cron="0 * * ? * *")
    public void realtimeStockPriceScheduler() {

        List<StockInfo> stockInfoList = stockInfoMapper.findAll();
        Map<String, NetStockPrice> netStockPriceMap = new HashMap<>();

        List<String> symbols = stockInfoList.stream()
                .map(this::buildSymbol)
                .collect(Collectors.toList());
        List<List<String>> symbolsCollection = Lists.partition(symbols, 500);

        for (List<String> st : symbolsCollection) {
            JsonNode jn = getMarketRealtime(st);
            for (Iterator<String> it = jn.fieldNames(); it.hasNext(); ) {
                String stockSymbol = it.next();
                double price = jn.path(stockSymbol).path("price").asDouble();
                Date tradeTime = new Date();
                String tradeTimeText = jn.path(stockSymbol).path("update").asText();
                try {
                    tradeTime = formatter.parse(tradeTimeText);
                } catch (ParseException e) {
                    logger.error("error parse tradeTime for symbol = {}, tradeTimeText = {}", stockSymbol, tradeTimeText, e);
                }

                NetStockPrice netStockPrice = new NetStockPrice(price, tradeTime);
                netStockPriceMap.put(stockSymbol, netStockPrice);
            }
        }

        int totalUpdate = 0;
        for (StockInfo stock : stockInfoList) {
            String stockSymbol = buildSymbol(stock);
            if (netStockPriceMap.containsKey(stockSymbol)) {
                NetStockPrice stockPrice = netStockPriceMap.get(stockSymbol);
                boolean success = addRealtimePrice(stock.getSid(), stockPrice.price, stockPrice.tradeTime);
                if (!success){
                    return;
                }
                totalUpdate++;
            }
        }

        logger.info("[realtimeStockPriceScheduler] update {} stock prices", totalUpdate);
    }
}
