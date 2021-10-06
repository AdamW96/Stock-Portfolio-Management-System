package unsw_9900.nobugs.mapper;

import org.apache.ibatis.annotations.Mapper;
import unsw_9900.nobugs.po.MarketHistory;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 * @author: Rui
 * @date: 2021/10/6
 */
@Mapper
public interface MarketHistoryMapper {
    int insert(MarketHistory record);
}