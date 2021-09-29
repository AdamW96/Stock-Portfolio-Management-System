package unsw_9900.nobugs.advice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import unsw_9900.nobugs.constant.ResponseConstant;
import unsw_9900.nobugs.controller.response.SvcResponse;
import unsw_9900.nobugs.exception.SvcException;

import javax.validation.ValidationException;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/9/25
 */
@RestControllerAdvice
public class SvcExceptionHandlerAdvice {


    private static Logger logger = LoggerFactory.getLogger(SvcExceptionHandlerAdvice.class);


    /**
     * 404
     *
     * @param exception
     * @return
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public SvcResponse exceptionHandler(NoHandlerFoundException exception) {
        return SvcResponse.error(ResponseConstant.NOT_FOUND_CODE, "无效资源");
    }

    /**
     * 系统异常处理
     *
     * @param exception
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(code = HttpStatus.OK)
    public SvcResponse exceptionHandler(Exception exception) {
        logger.error(exception.getMessage(), exception);
        return SvcResponse.error(ResponseConstant.INTERNAL_ERROR_COD, "系统异常");
    }

    /**
     * 系统流程处理，正常的业务处理异常
     *
     * @param exception
     * @return
     */
    @ExceptionHandler(SvcException.class)
    @ResponseStatus(code = HttpStatus.OK)
    public SvcResponse loginExceptionHandler(SvcException exception) {
        return SvcResponse.error(exception.getCode(), exception.getMessage());
    }

    /**
     * request exception
     *
     * @param exception
     * @return
     */
    @ExceptionHandler({ValidationException.class, MissingServletRequestParameterException.class, MethodArgumentTypeMismatchException.class})
    @ResponseStatus(code = HttpStatus.OK)
    public SvcResponse validateException(Exception exception) {
        return SvcResponse.error(ResponseConstant.NOT_ACCEPT_CODE, exception.getMessage());
    }

    /**
     * request exception
     *
     * @param exception
     * @return
     */
    @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
    @ResponseStatus(code = HttpStatus.METHOD_NOT_ALLOWED)
    public SvcResponse methodNotAllowedException(Exception exception) {
        return SvcResponse.error(ResponseConstant.METHOD_NOT_ALLOWED_CODE, exception.getMessage());
    }

    /**
     * request mapping bean bind exception
     */
    @ExceptionHandler(BindException.class)
    public SvcResponse handleValidationException(BindException e) {
        FieldError fieldError = e.getBindingResult().getFieldError();
        if (fieldError != null) {
            String msg = fieldError.getDefaultMessage();
            logger.info("参数校验错误 msg = {}", msg);
            return SvcResponse.error(ResponseConstant.NOT_ACCEPT_CODE, msg);
        } else {
            logger.info("参数校验错误", e);
            return SvcResponse.error(ResponseConstant.NOT_ACCEPT_CODE, "参数校验错误");
        }
    }

}
