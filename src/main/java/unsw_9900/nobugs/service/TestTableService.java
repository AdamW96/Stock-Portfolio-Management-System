package unsw_9900.nobugs.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unsw_9900.nobugs.mapper.TestTableMapper;
import unsw_9900.nobugs.po.TestTable;

import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
@Service
public class TestTableService {

    private static final Logger logger = LoggerFactory.getLogger(TestTableService.class);

    @Autowired
    private TestTableMapper testTableMapper;

    public List<TestTable> findAll() {
        List<TestTable> list = testTableMapper.findAll();
        logger.info("find {} lines", list.size());
        return list;
    }

}
