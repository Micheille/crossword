package com.progringer.crossword.response;

import com.progringer.crossword.model.Crossword;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CrosswordBrowsedResponse {
    public Crossword crossword;
}
