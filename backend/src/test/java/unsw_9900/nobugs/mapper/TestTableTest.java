package unsw_9900.nobugs.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import unsw_9900.nobugs.Application;
import unsw_9900.nobugs.po.TestTable;

import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class TestTableTest {

    @Autowired
    private TestTableMapper mapper;

    @Test
    public void findAllTestTables() {

        List<TestTable> list = mapper.findAll();
        System.out.println(list.size());
    }

}
