package com.daenom.workout.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateResourceException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleDuplicateResourceException(DuplicateResourceException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ex.getMessage();
    }
}
