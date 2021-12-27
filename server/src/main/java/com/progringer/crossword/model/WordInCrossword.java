package com.progringer.crossword.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WordInCrossword implements Serializable {
    private String word;
    private int i, j; //координаты первой буквы на сетке
    private int direction; // 1 - горизонтально, -1 - вертикально
    private String definition;
}
