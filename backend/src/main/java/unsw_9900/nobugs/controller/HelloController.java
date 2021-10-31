package unsw_9900.nobugs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import unsw_9900.nobugs.controller.response.SvcResponse;
import unsw_9900.nobugs.dto.userDto;
import unsw_9900.nobugs.mapper.CommentsMapper;
import unsw_9900.nobugs.mapper.MarketHistoryMapper;
import unsw_9900.nobugs.mapper.TestTableMapper;
import unsw_9900.nobugs.mapper.UserInfoMapper;
import unsw_9900.nobugs.po.Comments;
import unsw_9900.nobugs.po.MarketHistory;
import unsw_9900.nobugs.po.TestTable;
import unsw_9900.nobugs.po.UserInfo;
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

    @RequestMapping(value = "health", method = RequestMethod.GET)
    public String health() {
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
}
