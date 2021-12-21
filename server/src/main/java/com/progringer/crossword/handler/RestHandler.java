package com.progringer.crossword.handler;

import com.progringer.crossword.exception.DictionaryFileException;
import com.progringer.crossword.response.DefaultErrorResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.io.StreamCorruptedException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.NoSuchFileException;

@Log4j2
@ControllerAdvice
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class RestHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public DefaultErrorResponse defaultExceptionHandler(Exception ex){
        log.error(ex.getMessage(), ex);
        return new DefaultErrorResponse(ex.getClass()+" "+ex.getMessage());
    }

    @ExceptionHandler(DictionaryFileException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public DefaultErrorResponse dictionaryErrorHandler(DictionaryFileException ex){
        log.error(ex.getMessage(), ex);
        return new DefaultErrorResponse(ex.getMessage());
    }
    @ExceptionHandler(FileAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public DefaultErrorResponse fileAlreadyExistsExceptionHandler(FileAlreadyExistsException ex){
        return new DefaultErrorResponse("Файл с таким именем уже существует!");
    }
    @ExceptionHandler(NoSuchFileException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public DefaultErrorResponse fileNotFoundExceptionHandler(NoSuchFileException ex){
        return new DefaultErrorResponse("Файл не найден!");
    }
    @ExceptionHandler(StreamCorruptedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public DefaultErrorResponse fileIsDamagedException(StreamCorruptedException e){
        return new DefaultErrorResponse("К сожалению, файл поврежден. Попробуйте выбрать другой кроссворд.");
    }
    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class, MissingServletRequestParameterException.class, HttpMediaTypeNotSupportedException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public DefaultErrorResponse handleMethodArgumentNotValidException(Exception ex){
        return new DefaultErrorResponse(ex.getMessage());
    }

}
