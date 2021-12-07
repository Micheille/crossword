package com.progringer.crossword.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Word {
    private String word;
    private int i, j; //координаты первой буквы на сетке
    private int direction; // 1 - горизонтально, -1 - вертикально
    private String definition;
}
