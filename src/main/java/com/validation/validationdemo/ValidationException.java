package com.validation.validationdemo;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * errorCode : 1004 -> 화면전환 필요 및 Toast 메세지 필요
 *
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ValidationException extends RuntimeException{
    private Long errorCode;
    private String errorMessage;
    private Error[] errors;

    public ValidationException(Long errorCode, String errorMessage, String defaultMessage, String field){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errors = new Error[]{new Error(defaultMessage, field)};
    }

    public ValidationException(Long errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public ValidationException(String errorMessage){
        this.errorMessage = errorMessage;
    }



    public ValidationException(Error[] errors) {
        this.errors = errors;
    }

    public Error[] getErrors() {
        return errors;
    }

    public Long getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public static class Error {

        private String defaultMessage;
        private String field;

        public Error(String defaultMessage, String field) {
            this.defaultMessage = defaultMessage;
            this.field = field;
        }

        public String getDefaultMessage() {
            return defaultMessage;
        }

        public String getField() {
            return field;
        }
    }
}

