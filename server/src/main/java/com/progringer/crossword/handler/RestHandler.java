package com.progringer.crossword.handler;

import com.progringer.crossword.exception.DictionaryFileException;
import com.progringer.crossword.response.DefaultErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class RestHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public DefaultErrorResponse defaultExceptionHandler(Exception ex){
        //ex.printStackTrace();
        return new DefaultErrorResponse(ex.getClass()+" "+ex.getMessage());
    }

    @ExceptionHandler(DictionaryFileException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public DefaultErrorResponse dictionaryErrorHandler(DictionaryFileException ex){
        return new DefaultErrorResponse(ex.getMessage());
    }

    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class, MissingServletRequestParameterException.class, HttpMediaTypeNotSupportedException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public DefaultErrorResponse handleMethodArgumentNotValidException(Exception ex){
        return new DefaultErrorResponse(ex.getMessage());
    }

}
