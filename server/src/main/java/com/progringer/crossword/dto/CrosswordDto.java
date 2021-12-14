package com.progringer.crossword.dto;

import com.progringer.crossword.model.WordInCrossword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrosswordDto {

    private String name;
    private List<WordInCrossword> words;
    private int n;
    private int m;

}
