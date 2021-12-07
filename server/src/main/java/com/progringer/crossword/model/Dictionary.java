package com.progringer.crossword.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Dictionary implements Serializable {
    private String name;
    private List<Notion> words;

    public Dictionary(String name){
        this.name = name;
        this.words = new ArrayList<>();
    }

    public void addNotion(Notion notion){
        words.add(notion);
    }
}
