package com.progringer.crossword.exception;

public class DictionaryFileException extends RuntimeException{
    public DictionaryFileException(){
        super("Dictionary file is absent or damaged!");
    }
}
