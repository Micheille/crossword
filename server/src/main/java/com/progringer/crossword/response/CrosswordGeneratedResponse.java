package com.progringer.crossword.response;

import com.progringer.crossword.model.Crossword;

public class CrosswordGeneratedResponse {
    private Crossword crossword;

    public CrosswordGeneratedResponse(Crossword crossword) {
        this.crossword = crossword;
    }

    public Crossword getCrossword() {
        return crossword;
    }

    public void setCrossword(Crossword crossword) {
        this.crossword = crossword;
    }
}
