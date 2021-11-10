package unsw_9900.nobugs.realtime;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import unsw_9900.nobugs.Application;
import unsw_9900.nobugs.mapper.MarketRealtimeMapper;
import unsw_9900.nobugs.mapper.StockInfoMapper;
import unsw_9900.nobugs.po.MarketRealtime;
import unsw_9900.nobugs.service.realtime.RealtimeStockService;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/11/9
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class RealtimeStockServiceTest {

    @Autowired
    private StockInfoMapper stockInfoMapper;

    @Autowired
    private MarketRealtimeMapper marketRealtimeMapper;

    @Autowired
    private RealtimeStockService service;

    @Test
    public void scheduleRealtimeStockPriceTest() {
        service.realtimeStockPriceScheduler();
    }

    @Test
    public void getRealtimeStockPriceTest() {
        MarketRealtime record= marketRealtimeMapper.findOneBySidOrderByTradeTimeDesc(4);
        System.out.println(record);
    }


}
