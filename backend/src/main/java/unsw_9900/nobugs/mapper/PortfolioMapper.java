package unsw_9900.nobugs.mapper;

import org.apache.ibatis.annotations.Mapper;
import unsw_9900.nobugs.po.Portfolio;

import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/10/31
 */
@Mapper
public interface PortfolioMapper {
    int insert(Portfolio record);

    Portfolio findPortfolio(int uid, String name);

    List<Portfolio> findAllPortfolio(int uid);

    int deletePortfolio(int uid, String name);

    int renamePortfolio(int uid, String newName, String oldName);
}