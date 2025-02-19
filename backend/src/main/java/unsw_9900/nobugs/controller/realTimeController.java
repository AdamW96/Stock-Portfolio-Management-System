package unsw_9900.nobugs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import unsw_9900.nobugs.controller.response.SvcResponse;
import unsw_9900.nobugs.dto.portfolioDto;
import unsw_9900.nobugs.dto.stockRankDto;
import unsw_9900.nobugs.dto.userDto;
import unsw_9900.nobugs.mapper.*;
import unsw_9900.nobugs.po.*;
import unsw_9900.nobugs.po.stockGainDto;
import unsw_9900.nobugs.service.TestTableService;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
@RestController
public class realTimeController {


    @Autowired
    private TestTableMapper mapper;

    @Autowired
    private TestTableService testTableService;

    @Autowired
    private MarketHistoryMapper marketHistoryMapper;

    @Autowired
    private CommentsMapper commentsMapper;

    @Autowired
    private UserInfoMapper usersMapper;

    @Autowired
    private StockInfoMapper stockInfoMapper;

    @Autowired
    private PortfolioMapper portfolioMapper;

    @Autowired
    private StockHoldMapper stockHoldMapper;

    @Autowired
    private MarketRealtimeMapper marketRealtimeMapper;

    int getUid(HttpServletRequest request){
        Cookie[] cookies =  request.getCookies();
        if(cookies != null) {

            for (Cookie cookie : cookies) {
                String name = cookie.getName();
                if (name.equals("cookie_email")){
                    String email = cookie.getValue();
                    UserInfo user1 = usersMapper.getUidByEmail(email);
                    if (user1 == null){
                        return -1;
                    }
                    return user1.getUid();
                }
            }
        }
        return -1;
    }
    @RequestMapping(value = "/realTime/getStock", method = RequestMethod.POST)
    public SvcResponse getStock(HttpServletRequest request, @RequestBody MarketRealtime marketRealtime){

        MarketRealtime find = marketRealtimeMapper.findOneBySidOrderByTradeTimeDesc(marketRealtime.getSid());
        if (find == null){
            return SvcResponse.error(400, "没有这个股票");
        }
        return SvcResponse.success(find);
    }

    @RequestMapping(value = "/realTime/stockTrend", method = RequestMethod.POST)
    public SvcResponse stockTrend(HttpServletRequest request, @RequestBody MarketRealtime marketRealtime){

        MarketRealtime find = marketRealtimeMapper.findOneBySidOrderByTradeTimeDesc(marketRealtime.getSid());
        if (find == null){
            return SvcResponse.error(400, "没有这个股票");
        }
        MarketHistory stock = marketHistoryMapper.selectBySidDesc(marketRealtime.getSid());
        double rate = (find.getPrice() - stock.getClosedPrice()) / stock.getClosedPrice();
        stockGainDto  trend = new stockGainDto();
        trend.setSid(marketRealtime.getSid());
        trend.setOldPrice(stock.getClosedPrice());
        trend.setNewPrice(find.getPrice());
        trend.setRate(rate);
        return SvcResponse.success(trend);
    }

    @RequestMapping(value = "/user/portfolio/oneStockGain", method = RequestMethod.POST)
    public SvcResponse oneStockGain(HttpServletRequest request, @RequestBody StockHold stockHold){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        StockHold find = stockHoldMapper.findOneStock(stockHold.getPid(), stockHold.getSid());
        if (find == null){
            return SvcResponse.error(400, "找不到股票");
        }

        MarketRealtime stock = marketRealtimeMapper.findOneBySidOrderByTradeTimeDesc(stockHold.getSid());

        double gain = find.getLot() * (stock.getPrice() - find.getPrice());
        double rate = 0;
        if (find.getPrice() != 0){
            rate =  (stock.getPrice() - find.getPrice())/ find.getPrice();
        }
        stockGainDto stockGain = new stockGainDto();
        stockGain.setSid(stock.getSid());
        stockGain.setOldPrice(find.getPrice());
        stockGain.setNewPrice(stock.getPrice());
        stockGain.setLot(find.getLot());
        stockGain.setRate(rate);

        return SvcResponse.success(stockGain);
    }

    @RequestMapping(value = "/user/portfolio/totalGain", method = RequestMethod.POST)
    public SvcResponse totalGain(HttpServletRequest request, @RequestBody Portfolio portfolio){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        List<StockHold> find = stockHoldMapper.findAllStock(portfolio.getPid());
        if (find.isEmpty()){
            return SvcResponse.error(400, "尚未买股票");
        }

        double gain = 0;
        for (StockHold sub: find){
            int sid = sub.getSid();

            StockHold oldStock = stockHoldMapper.findOneStock(portfolio.getPid(), sid);
            MarketRealtime newStock1 = marketRealtimeMapper.findOneBySidOrderByTradeTimeDesc(sid);
            double profit1 = oldStock.getLot() * (newStock1.getPrice() - oldStock.getPrice());

            MarketHistory newStock2 = marketHistoryMapper.selectBySidDesc(sid);
            double profit2 = oldStock.getLot() * (newStock2.getClosedPrice() - oldStock.getPrice());
            gain += profit1;
        }
        return SvcResponse.success(gain);
    }

    @RequestMapping(value = "/user/totalGain", method = RequestMethod.POST)
    public SvcResponse userTotalGain(HttpServletRequest request, @RequestBody UserInfo userInfo){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        List<Portfolio> portfolios = portfolioMapper.findAllPortfolio(check_signIn);
        if (portfolios.isEmpty()){
            return SvcResponse.error(400, "尚未买股票");
        }
        double gain = 0;
        for (Portfolio p: portfolios){
            List<StockHold> stocks = stockHoldMapper.findAllStock(p.getPid());
            for (StockHold sub: stocks){
                int sid = sub.getSid();
                StockHold oldStock = stockHoldMapper.findOneStock(p.getPid(), sid);
                MarketRealtime newStock1 = marketRealtimeMapper.findOneBySidOrderByTradeTimeDesc(sid);
                double profit1 = oldStock.getLot() * (newStock1.getPrice() - oldStock.getPrice());
                gain += profit1;
            }
        }

        return SvcResponse.success(gain);
    }

    @RequestMapping(value = "/stock/best", method = RequestMethod.POST)
    public SvcResponse bestStock(HttpServletRequest request, @RequestBody UserInfo userInfo){

        List<stockRankDto> find = marketRealtimeMapper.findBestStock();
        if (find.isEmpty()){
            return SvcResponse.error(400, "没有股票");
        }
        for (stockRankDto stock : find){
            int sid = stock.getSid();
            double dif = stock.getCurrentPrice() - stock.getClosedPrice();
            StockInfo stockInfo = stockInfoMapper.findOneStockBySid(sid);
            stock.setSymbol(stockInfo.getSymbol());
            stock.setEnName(stockInfo.getEnname());
            stock.setPriceDif(dif);
        }
        return SvcResponse.success(find);
    }

    @RequestMapping(value = "/stock/worst", method = RequestMethod.POST)
    public SvcResponse worstStock(HttpServletRequest request, @RequestBody UserInfo userInfo){

        List<stockRankDto> find = marketRealtimeMapper.findWorstStock();
        if (find.isEmpty()){
            return SvcResponse.error(400, "没有股票");
        }
        for (stockRankDto stock : find){
            int sid = stock.getSid();
            double dif = stock.getCurrentPrice() - stock.getClosedPrice();
            StockInfo stockInfo = stockInfoMapper.findOneStockBySid(sid);
            stock.setSymbol(stockInfo.getSymbol());
            stock.setEnName(stockInfo.getEnname());
            stock.setPriceDif(dif);
        }
        return SvcResponse.success(find);
    }

    @RequestMapping(value = "/user/rank", method = RequestMethod.POST)
    public SvcResponse userRank(HttpServletRequest request, @RequestBody UserInfo userInfo){

        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }
        List<UserInfo> users = usersMapper.findAll();
        double[] gains = new double[users.size()];
        if (users.isEmpty()){
            return SvcResponse.error(400, "尚未买股票");
        }
        double gain_for_this_user = 0;
        for (int i=0; i< users.size(); i++){
            List<Portfolio> portfolios = portfolioMapper.findAllPortfolio(users.get(i).getUid());
            double gain = 0;
            for (Portfolio p: portfolios){
                List<StockHold> stocks = stockHoldMapper.findAllStock(p.getPid());
                for (StockHold sub: stocks){
                    int sid = sub.getSid();
                    StockHold oldStock = stockHoldMapper.findOneStock(p.getPid(), sid);
                    MarketRealtime newStock1 = marketRealtimeMapper.findOneBySidOrderByTradeTimeDesc(sid);
                    double profit1 = oldStock.getLot() * (newStock1.getPrice() - oldStock.getPrice());
                    gain += profit1;
                }
            }
            gains[i] = gain;
            if (users.get(i).getUid() == check_signIn) { //这个用户
                gain_for_this_user = gain;
            }
        }
        Arrays.sort(gains);
        int rank = 0;
        for (;rank < gains.length; rank++){
            if (gains[rank] == gain_for_this_user){
                break;
            }
        }
        return SvcResponse.success(gains.length - rank);
    }
}
