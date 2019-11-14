package com.validation.validationdemo.config;

import com.validation.validationdemo.ValidationException;

import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Configuration
public class ErrorAttributeConfig {
    @Bean
    public ErrorAttributes errorAttributes() {
        return new DefaultErrorAttributes() {
            @Override
            public Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
                Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest,includeStackTrace);
                Throwable error = getError(webRequest);
                if (error instanceof ValidationException) {
                    errorAttributes.put("errors", ((ValidationException)error).getErrors());
                    errorAttributes.put("message", ((ValidationException)error).getErrorMessage());
                    errorAttributes.put("errorCode", ((ValidationException)error).getErrorCode());
                }
                return errorAttributes;
            }

        };
    }
}
