package com.progringer.crossword.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DefaultErrorResponse {
    private String message;
}
