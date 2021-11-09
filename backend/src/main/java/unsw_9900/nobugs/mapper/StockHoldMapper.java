package unsw_9900.nobugs.mapper;

import org.apache.ibatis.annotations.Mapper;
import unsw_9900.nobugs.po.StockHold;

import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/10/31
 */
@Mapper
public interface StockHoldMapper {
    int insert(StockHold record);

    StockHold findOneStock(Integer pid, Integer sid);

    List<StockHold> findAllStock(Integer pid);

    int delete(Integer pid, Integer sid);
}