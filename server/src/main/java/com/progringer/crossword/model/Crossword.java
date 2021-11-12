package com.progringer.crossword.model;

import java.util.ArrayList;
import java.util.List;

public class Crossword {

    private List<Word> words;
    private int n;
    private int m;

    public Crossword(int n, int m){
        this.words = new ArrayList<>();
        this.n = n;
        this.m = m;
    }

    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    public int getM() {
        return m;
    }

    public void setM(int m) {
        this.m = m;
    }

    public List<Word> getWords() {
        return words;
    }

    public void setWords(List<Word> words) {
        this.words = words;
    }

    public void addWord(Word word){
        words.add(word);
    }
}
