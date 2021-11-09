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
public class StockController {


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
    private StockInfoMapper stockInfo;

    @Autowired
    private PortfolioMapper portfolioMapper;

    @Autowired
    private StockHoldMapper stockHoldMapper;

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

    @RequestMapping(value = "/user/portfolio/buyStock", method = RequestMethod.POST)
    public SvcResponse buyStock(HttpServletRequest request, @RequestBody StockHold stockHold){

        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        try{
            stockHoldMapper.insert(stockHold);
        }
        catch (DuplicateKeyException exception) {
            throw new DuplicateKeyException("pid,sid 已经被使用");
        }

        return SvcResponse.success(stockHold);
    }

    @RequestMapping(value = "/user/portfolio/getOneStock", method = RequestMethod.POST)
    public SvcResponse getOneStock(HttpServletRequest request, @RequestBody StockHold stockHold){

        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        StockHold find = stockHoldMapper.findOneStock(stockHold.getPid(), stockHold.getSid());
        if (find == null){
            return SvcResponse.error(400, "没有这个股票");
        }
        return SvcResponse.success(find);
    }

    @RequestMapping(value = "/user/portfolio/getAllStock", method = RequestMethod.POST)
    public SvcResponse getAllStock(HttpServletRequest request, @RequestBody StockHold stockHold){

        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        List<StockHold> find = stockHoldMapper.findAllStock(stockHold.getPid());
        if (find == null){
            return SvcResponse.error(400, "没有这个股票");
        }
        return SvcResponse.success(find);
    }

    @RequestMapping(value = "/user/portfolio/sellStock", method = RequestMethod.POST)
    public SvcResponse sellStock(HttpServletRequest request, @RequestBody StockHold stockHold){

        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        int flag = stockHoldMapper.delete(stockHold.getPid(), stockHold.getSid());
        if (flag != 1) {
            return SvcResponse.error(400, "没有这个股票");
        }
        return SvcResponse.success("删除成功");
    }
}
