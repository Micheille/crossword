package com.progringer.crossword.model;

public class Word {
    private String word;
    private int i, j; //координаты первой буквы на сетке
    private int direction; // 1 - горизонтально, -1 - вертикально
    private String definition;
    public Word(String word, int i, int j, int direction, String definition){
        this.word = word;
        this.i = i;
        this.j = j;
        this.direction = direction;
        this.definition = definition;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public int getI() {
        return i;
    }

    public void setI(int i) {
        this.i = i;
    }

    public int getJ() {
        return j;
    }

    public void setJ(int j) {
        this.j = j;
    }

    public int getDirection() {
        return direction;
    }

    public void setDirection(int direction) {
        this.direction = direction;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }
}
