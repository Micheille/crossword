package com.progringer.crossword.response;

public class DefaultErrorResponse {

    private String message;
    public DefaultErrorResponse(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
