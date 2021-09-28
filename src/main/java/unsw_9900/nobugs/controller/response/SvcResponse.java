package unsw_9900.nobugs.controller.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import unsw_9900.nobugs.constant.ResponseConstant;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
public class SvcResponse<T> {

    private Integer code;
    private String msg;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public static <T> SvcResponse<T> success(T data) {
        SvcResponse<T> rep = new SvcResponse<>();
        rep.setCode(ResponseConstant.OK_CODE);
        rep.setMsg(ResponseConstant.OK_MSG);
        rep.setData(data);
        return rep;
    }

    public static <T> SvcResponse<T> success() {
        SvcResponse<T> rep = new SvcResponse<>();
        rep.setCode(ResponseConstant.OK_CODE);
        rep.setMsg(ResponseConstant.OK_MSG);
        return rep;
    }

    public static <T> SvcResponse<T> successMsg(String msg) {
        SvcResponse<T> rep = new SvcResponse<>();
        rep.setCode(ResponseConstant.OK_CODE);
        rep.setMsg(msg);
        return rep;
    }

    public static <T> SvcResponse<T> error(int code, String msg, T data) {
        SvcResponse<T> rep = new SvcResponse<>();
        rep.setCode(code);
        rep.setMsg(msg);
        rep.setData(data);

        return rep;
    }

    public static <T> SvcResponse<T> error(int code, String msg) {
        SvcResponse<T> rep = new SvcResponse<>();
        rep.setCode(code);
        rep.setMsg(msg);

        return rep;
    }

    public static void send(HttpServletResponse response, int code, String msg) throws Exception {

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        PrintWriter out = response.getWriter();
        SvcResponse svcResponse = new SvcResponse();
        svcResponse.setCode(code);
        svcResponse.setMsg(msg);

        ObjectMapper mapper = new ObjectMapper();

        String value = mapper.writeValueAsString(svcResponse);
        out.print(value);

        out.flush();

    }

    public static void sendInternalError(HttpServletResponse response) throws IOException {

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setStatus(500);


        PrintWriter out = null;
        out = response.getWriter();
        out.print("{\"code\": 500, \"msg\": \"服务器开小差了\"");
        out.flush();
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

