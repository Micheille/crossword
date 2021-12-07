package com.progringer.crossword.exception;

public class DictionaryFileException extends RuntimeException{
    public DictionaryFileException(){
        super("Файл словаря отсутствует или поврежден!");
    }
}
