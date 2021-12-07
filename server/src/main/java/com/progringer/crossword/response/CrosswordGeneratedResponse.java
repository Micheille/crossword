package com.progringer.crossword.response;

import com.progringer.crossword.model.Crossword;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CrosswordGeneratedResponse {
    private Crossword crossword;
}
