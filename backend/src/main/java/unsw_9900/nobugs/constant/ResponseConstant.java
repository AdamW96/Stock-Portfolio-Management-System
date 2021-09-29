package unsw_9900.nobugs.constant;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
public class ResponseConstant {

    public static final Integer OK_CODE = 200;
    public static final Integer UNAUTH_CODE = 401;
    public static final Integer FORBID_CODE = 403;
    public static final Integer NOT_FOUND_CODE = 404;
    public static final Integer METHOD_NOT_ALLOWED_CODE = 405;
    public static final Integer NOT_ACCEPT_CODE = 406;
    public static final Integer CONFILICT_CODE = 409;
    public static final Integer INTERNAL_ERROR_COD = 500;
    public static final String OK_MSG = "ok";

    private ResponseConstant() {
    }
}
