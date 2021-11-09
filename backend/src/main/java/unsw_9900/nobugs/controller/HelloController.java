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
public class HelloController {


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

    @RequestMapping(value = "health", method = RequestMethod.GET)
    public String health(HttpServletRequest request) {
        int uid = getUid(request);
        System.out.println("this is uid "+uid +'\n');
        System.out.println("in health");
        return "ok";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String hello() {
        return "hello";
    }

    @RequestMapping(value = "/findall", method = RequestMethod.GET)
    public SvcResponse findAll() {
        List<MarketHistory> list = marketHistoryMapper.selectBySid(10);

        Comments comments = new Comments();
        comments.setSid(10);
        comments.setUid(1);
        comments.setMsg("hhhh");
        comments.setCreateTime(new Date());
        comments.setUpdateTime(new Date());
        commentsMapper.insert(comments);

        List<Comments> list2 = commentsMapper.selectAll();

        return SvcResponse.success(list);
    }

    @RequestMapping(value = "/user/register", method = RequestMethod.POST)

    public SvcResponse signIn(@RequestBody UserInfo user) {


        String email = user.getEmail();
        UserInfo user1 = usersMapper.findEmail(email);
        if (user1!= null){
            return SvcResponse.error(400, "email重复");
        }
        try{
            usersMapper.insert(user);
        }
        catch (DuplicateKeyException exception) {
            throw new DuplicateKeyException("uid 已经被使用");
        }

        return SvcResponse.success(email);
    }

    @RequestMapping(value = "/allUsers", method = RequestMethod.GET)
    public SvcResponse allUsers() {
        List<UserInfo> list = usersMapper.findAll();
        return SvcResponse.success(list);
    }

    @RequestMapping(value = "/user/signIn", method = RequestMethod.POST)
    public SvcResponse signIn(HttpServletRequest request, @RequestBody userDto user, HttpServletResponse response){

        String email = user.getEmail();
        String pwdMd5 = user.getPwdMd5();

        UserInfo user1 = usersMapper.getUserByUsernameAndPassword(email, pwdMd5);
        if (user1 == null) {
            return SvcResponse.error(400, "用户名或密码错误");
        }
        Cookie cookie_email = new Cookie("cookie_email",email);
        //设置cookie的持久化时间，30天
        cookie_email.setMaxAge(30 * 24 * 60 * 60);
        response.addCookie(cookie_email);
        return SvcResponse.success(user1);
    }

    @RequestMapping(value = "/stock/{sid}", method = RequestMethod.GET)
    public SvcResponse getPrice(@PathVariable int sid){
        List<MarketHistory> history = marketHistoryMapper.selectBySid(sid);
        if (history == null){
            return SvcResponse.error(400, "找不到对应股票");
        }
        return SvcResponse.success(history);
    }



    @RequestMapping(value = "/user/portfolio/add", method = RequestMethod.POST)
    public SvcResponse addPortfolio(HttpServletRequest request, @RequestBody Portfolio portfolio){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(400,"尚未登录");
        }
        portfolio.setUid(check_signIn);
        String name = portfolio.getpName();
        Portfolio p = portfolioMapper.findPortfolio(check_signIn,name);
        if (p!= null){
            return SvcResponse.error(400, "portfolio名字重复");
        }
        try{
            portfolioMapper.insert(portfolio);
        }
        catch (DuplicateKeyException exception) {
            throw new DuplicateKeyException("pid 已经被使用");
        }

        return SvcResponse.success(portfolio);
    }

    @RequestMapping(value = "/user/portfolio/rename", method = RequestMethod.POST)
    public SvcResponse renamePortfolio(HttpServletRequest request, @RequestBody portfolioDto portfolio){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
//            todo 重定向
            return SvcResponse.error(403,"尚未登录");
        }
        String newName = portfolio.getNewName();
        String oldName = portfolio.getOldName();
        int flag = portfolioMapper.renamePortfolio(check_signIn, newName, oldName);
        if (flag!= 1){
            return SvcResponse.error(400, "没有这个portfolio");
        }
        return SvcResponse.success("更新成功");
    }

    @RequestMapping(value = "/user/portfolio/getAll", method = RequestMethod.GET)
    public SvcResponse getAllPortfolio(HttpServletRequest request){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
//            todo 重定向
            return SvcResponse.error(403,"尚未登录");
        }

        List<Portfolio> p = portfolioMapper.findAllPortfolio(check_signIn);
        if (p.isEmpty()){
            return SvcResponse.error(400, "没有portfolio");
        }
        return SvcResponse.success(p);
    }
    @RequestMapping(value = "/user/portfolio/getOne", method = RequestMethod.POST)
    public SvcResponse getOnePortfolio(HttpServletRequest request, @RequestBody Portfolio portfolio){

        int check_signIn = getUid(request);
        if (check_signIn == -1){
//            todo 重定向
            return SvcResponse.error(403,"尚未登录");
        }

        Portfolio p = portfolioMapper.findPortfolio(check_signIn, portfolio.getpName());
        if (p == null){
            return SvcResponse.error(400, "没有portfolio");
        }
        return SvcResponse.success(p);
    }

    @RequestMapping(value = "/user/portfolio/deleteOne", method = RequestMethod.POST)
    public SvcResponse delOnePortfolio(HttpServletRequest request, @RequestBody Portfolio portfolio){

        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(403,"尚未登录");
        }

        int flag = portfolioMapper.deletePortfolio(check_signIn, portfolio.getpName());
        if (flag != 1) {
            return SvcResponse.error(400, "没有这个portfolio");
        }
        return SvcResponse.success("删除成功");
    }


}
