package unsw_9900.nobugs.mapper;

import org.apache.ibatis.annotations.Mapper;
import unsw_9900.nobugs.po.UserInfo;

import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/10/31
 */
@Mapper
public interface UserInfoMapper {
    UserInfo getUidByEmail(String email);

    int insert(UserInfo record);

    UserInfo findEmail(String email);

    List<UserInfo> findAll();

    UserInfo getUserByUsernameAndPassword(String email, String pwdMd5);
}