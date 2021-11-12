package unsw_9900.nobugs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import unsw_9900.nobugs.controller.response.SvcResponse;
import unsw_9900.nobugs.dto.portfolioDto;
import unsw_9900.nobugs.dto.userDto;
import unsw_9900.nobugs.mapper.*;
import unsw_9900.nobugs.po.*;
import unsw_9900.nobugs.service.TestTableService;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

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

//            todo 比较日期时间
            gain += profit1;
        }
        return SvcResponse.success(gain);
    }

    @RequestMapping(value = "/stock/best", method = RequestMethod.POST)
    public SvcResponse bestStock(HttpServletRequest request, @RequestBody UserInfo userInfo){

        MarketRealtime find = marketRealtimeMapper.findBestStock();
        if (find == null){
            return SvcResponse.error(400, "没有股票");
        }
        return SvcResponse.success(find);
    }

    @RequestMapping(value = "/stock/worst", method = RequestMethod.POST)
    public SvcResponse worstStock(HttpServletRequest request, @RequestBody UserInfo userInfo){

        MarketRealtime find = marketRealtimeMapper.findWorstStock();
        if (find == null){
            return SvcResponse.error(400, "没有股票");
        }
        return SvcResponse.success(find);
    }
}
