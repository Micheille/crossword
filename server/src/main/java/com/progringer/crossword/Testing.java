package com.progringer.crossword;

public class Testing {
    public static void main(String[] args) {
        CrosswordGenerator cg = new CrosswordGenerator(20, 20, "slovar.dict");
        cg.generate();
        cg.printGrid();
    }
}
