package unsw_9900.nobugs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import unsw_9900.nobugs.controller.response.SvcResponse;
import unsw_9900.nobugs.dto.portfolioDto;
import unsw_9900.nobugs.dto.userDto;
import unsw_9900.nobugs.mapper.*;
import unsw_9900.nobugs.po.*;
import unsw_9900.nobugs.service.TestTableService;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
@RestController
public class CommentController {


    @Autowired
    private TestTableMapper mapper;

    @Autowired
    private TestTableService testTableService;

    @Autowired
    private MarketHistoryMapper marketHistoryMapper;

    @Autowired
    private CommentsMapper commentsMapper;

    @Autowired
    private UserInfoMapper usersMapper;

    @Autowired
    private StockInfoMapper stockInfo;

    @Autowired
    private PortfolioMapper portfolioMapper;

    int getUid(HttpServletRequest request){
        Cookie[] cookies =  request.getCookies();
        if(cookies != null) {

            for (Cookie cookie : cookies) {
                String name = cookie.getName();
                if (name.equals("cookie_email")){
                    String email = cookie.getValue();
                    UserInfo user1 = usersMapper.getUidByEmail(email);
                    if (user1 == null){
                        return -1;
                    }
                    return user1.getUid();
                }
            }
        }
        return -1;
    }

    @RequestMapping(value = "/user/comment/add", method = RequestMethod.POST)
    public SvcResponse addComment(HttpServletRequest request, @RequestBody Comments comments){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(400,"尚未登录");
        }
        comments.setUid(check_signIn);
        int flag = commentsMapper.insert(comments);
        if (flag == 0){
            return SvcResponse.error(400, "插入评论失败");
        }
        return SvcResponse.success(comments);
    }

    @RequestMapping(value = "/user/comment/delete", method = RequestMethod.POST)
    public SvcResponse deleteComment(HttpServletRequest request, @RequestBody Comments comments){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(400,"尚未登录");
        }

        Comments find = commentsMapper.findByMid(comments.getMid());

        if (find == null){
            return SvcResponse.error(400, "没有这个mid");
        }
        if (check_signIn != find.getUid()){
            return SvcResponse.error(400, "用户id不匹配");
        }
        int flag = commentsMapper.delete(comments.getMid());
        if (flag == 0){
            return SvcResponse.error(400, "删除评论失败");
        }
        return SvcResponse.success("删除成功");
    }



    @RequestMapping(value = "/user/comment/change", method = RequestMethod.POST)
    public SvcResponse changeComment(HttpServletRequest request, @RequestBody Comments comments){
        int check_signIn = getUid(request);
        if (check_signIn == -1){
            return SvcResponse.error(400,"尚未登录");
        }
        Comments find = commentsMapper.findByMid(comments.getMid());

        if (find == null){
            return SvcResponse.error(400, "没有这个mid");
        }
        if (check_signIn != find.getUid()){
            return SvcResponse.error(400, "用户id不匹配");
        }

        int flag = commentsMapper.update(comments.getMid(), comments.getMsg(), comments.getUpdateTime());
        if (flag != 1){
            return SvcResponse.error(400, "更新comments失败");
        }
        return SvcResponse.success("更新comments成功");
    }

}
