package com.progringer.crossword.dto;

import com.progringer.crossword.model.Word;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrosswordDto {

    private List<Word> words;
    private int n;
    private int m;

}
