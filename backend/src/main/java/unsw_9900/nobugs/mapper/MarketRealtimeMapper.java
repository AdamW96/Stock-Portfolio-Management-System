package unsw_9900.nobugs.mapper;
import org.apache.ibatis.annotations.Param;

import org.apache.ibatis.annotations.Mapper;
import unsw_9900.nobugs.po.MarketRealtime;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/10/31
 */
@Mapper
public interface MarketRealtimeMapper {
    int insert(MarketRealtime record);

    MarketRealtime findOneBySidOrderByTradeTimeDesc(@Param("sid")Integer sid);

    MarketRealtime findStock(Integer sid);

    MarketRealtime findBestStock();

    MarketRealtime findWorstStock();
}
