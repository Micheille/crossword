package com.progringer.crossword.response;

import com.progringer.crossword.model.Crossword;

public class CrosswordResponse {
    private Crossword crossword;

    public CrosswordResponse(Crossword crossword) {
        this.crossword = crossword;
    }

    public Crossword getCrossword() {
        return crossword;
    }

    public void setCrossword(Crossword crossword) {
        this.crossword = crossword;
    }
}
