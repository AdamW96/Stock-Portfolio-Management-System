package unsw_9900.nobugs.mapper;

import org.apache.ibatis.annotations.Mapper;
import unsw_9900.nobugs.po.Comments;import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/10/31
 */
@Mapper
public interface CommentsMapper {
    int insert(Comments record);

    List<Comments> selectAll();
}