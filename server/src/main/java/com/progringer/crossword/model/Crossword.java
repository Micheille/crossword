package com.progringer.crossword.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Crossword implements Serializable {

    private String name;
    private List<WordInCrossword> words;
    private int n;
    private int m;

    public Crossword(int n, int m){
        this.words = new ArrayList<>();
        this.n = n;
        this.m = m;
    }

    public Crossword(int n, int m, List<WordInCrossword> words){
        this.words = words;
        this.n = n;
        this.m = m;
    }

    public void addWord(WordInCrossword word){
        words.add(word);
    }

    /*public boolean hasSeparatedWords(){
        HashSet<WordInCrossword> separatedWords = new HashSet<>(words);
        for(int i = )
    }*/
}
