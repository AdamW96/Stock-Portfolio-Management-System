package unsw_9900.nobugs.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;import unsw_9900.nobugs.po.MarketHistory;import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/10/31
 */
@Mapper
public interface MarketHistoryMapper {
    int insert(MarketHistory record);

    List<MarketHistory> selectBySid(@Param("sid") Integer sid);

}