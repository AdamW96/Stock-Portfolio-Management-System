package unsw_9900.nobugs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unsw_9900.nobugs.controller.response.SvcResponse;
import unsw_9900.nobugs.mapper.TestTableMapper;
import unsw_9900.nobugs.po.TestTable;
import unsw_9900.nobugs.service.TestTableService;

import javax.annotation.Resource;
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
        List<TestTable> list = testTableService.findAll();
        return SvcResponse.success(list);
    }

}
