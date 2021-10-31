package unsw_9900.nobugs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unsw_9900.nobugs.controller.response.SvcResponse;
import unsw_9900.nobugs.mapper.CommentsMapper;
import unsw_9900.nobugs.mapper.MarketHistoryMapper;
import unsw_9900.nobugs.mapper.TestTableMapper;
import unsw_9900.nobugs.po.Comments;
import unsw_9900.nobugs.po.MarketHistory;
import unsw_9900.nobugs.po.TestTable;
import unsw_9900.nobugs.service.TestTableService;

import javax.annotation.Resource;
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

}
