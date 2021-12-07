package com.progringer.crossword.service;

import com.progringer.crossword.model.Crossword;

import java.io.IOException;

public interface CrosswordGeneratorService {
    Crossword generateCrossword(int n, int m, String dictName) throws IOException, ClassNotFoundException;
}
