package unsw_9900.nobugs.exception;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
public class SvcException extends RuntimeException {


    private final int code;

    public SvcException() {
        super();
        code = -1;
    }

    public SvcException(int code, String message) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}

