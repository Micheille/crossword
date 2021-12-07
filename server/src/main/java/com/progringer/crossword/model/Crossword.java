package com.progringer.crossword.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Crossword {

    private String name;
    private List<Word> words;
    private int n;
    private int m;

    public Crossword(int n, int m){
        this.words = new ArrayList<>();
        this.n = n;
        this.m = m;
    }

    public void addWord(Word word){
        words.add(word);
    }
}
