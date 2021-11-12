package com.progringer.crossword;

import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.model.Dictionary;
import com.progringer.crossword.model.Word;

import java.nio.file.Path;
import java.util.Arrays;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class CrosswordGenerator {
    private final char NOT_HORIZONTAL = '/';
    private final char NOT_VERTICAL = '\\';
    private final char NOT_WRITE = '-';
    private final char EMPTY = '.';
    private Crossword crossword;
    private Dictionary dictionary;
    private char[][] grid;

    public CrosswordGenerator(int n, int m, String file){
        crossword = new Crossword(n, m);
        grid = new char[n][m];
        for (char[] row : grid)
            Arrays.fill(row, EMPTY);
        dictionary = new Dictionary(Path.of("src","main","resources","static", file));
    }

    public Crossword generate() {
        Word firstWord = getFirstWord(grid.length, grid[0].length);
        crossword.addWord(firstWord);
        dictionary.addUsedWord(firstWord.getWord());
        int current = 0;
        while (crossword.getWords().size()>current) {
            findNextWord(crossword.getWords().get(current));
            current++;
        }
        return crossword;
    }

    private Word getFirstWord(int n, int m) {
        int firstDir;
        String firstWord;
        int i;
        int j;
        if (n>m){
            firstDir = -1;
            firstWord = dictionary.getLongest(n);
            i = (n-firstWord.length())/2;
            j = m/2;
        }
        else {
            firstDir = 1;
            firstWord = dictionary.getLongest(m);
            i = n/2;
            j = (m-firstWord.length())/2;
        }
        Word word = new Word(firstWord, i, j, firstDir, dictionary.getNotUsedDefinition(firstWord));
        writeWord(word);
        return word;
    }

    private void writeWord(Word word){
        char[] chars = word.getWord().toCharArray();
        int j = word.getJ();
        int i = word.getI();
        if (word.getDirection()==-1){
            for(int i1 = 0; i1<chars.length; i1++){
                grid[i+i1][j] = chars[i1];
                if (j!=grid[0].length-1) {
                    if (grid[i + i1][j + 1] == EMPTY)
                        grid[i + i1][j + 1] = NOT_VERTICAL;
                    else if (grid[i + i1][j + 1] == NOT_HORIZONTAL)
                        grid[i + i1][j + 1] = NOT_WRITE;
                }
                if (j!=0) {
                    if (grid[i + i1][j - 1] == EMPTY)
                        grid[i + i1][j - 1] = NOT_VERTICAL;
                    else if (grid[i + i1][j - 1] == NOT_HORIZONTAL)
                        grid[i + i1][j - 1] = NOT_WRITE;
                }
            }
            if (i!=0)
                grid[i-1][j] = NOT_WRITE;
            if (i+chars.length<grid.length)
                grid[i+chars.length][j] = NOT_WRITE;
        }
        else {
            for(int j1 = 0; j1<chars.length; j1++){
                grid[i][j+j1] = chars[j1];
                if (i!=grid.length-1) {
                    if (grid[i + 1][j + j1] == EMPTY)
                        grid[i + 1][j + j1] = NOT_HORIZONTAL;
                    else if (grid[i + 1][j + j1] == NOT_VERTICAL)
                        grid[i + 1][j + j1] = NOT_WRITE;
                }
                if (i!=0) {
                    if (grid[i - 1][j + j1] == EMPTY)
                        grid[i - 1][j + j1] = NOT_HORIZONTAL;
                    else if (grid[i - 1][j + j1] == NOT_VERTICAL)
                        grid[i - 1][j + j1] = NOT_WRITE;
                }
            }
            if (j!=0)
                grid[i][j-1] = NOT_WRITE;
            if (j+chars.length<grid[0].length)
                grid[i][j+chars.length] = NOT_WRITE;
        }
    }

    private void findNextWord(Word oldWord) {
        int dir = oldWord.getDirection()*-1;   //меняем направление на противоположное направлению слова-основе
        for (int k = 0; k< oldWord.getWord().length(); k++){
            StringBuffer regex = createRegex(oldWord, k);
            if (regex.length()>0) {
                findMatchesAndWrite(regex.toString(), dir, oldWord, k);
            }
        }
    }

    private StringBuffer createRegex(Word oldWord, int k){
        int dir = oldWord.getDirection()*-1;   //меняем направление на противоположное направлению слова-основе
        char[] chars = oldWord.getWord().toCharArray();
        int iteratedVar = 0;
        int n = 0;
        char[] rowOrCol = new char[0];
        char interdictChar = 0;
        char toIgnore = 0;
        StringBuffer regex = new StringBuffer();
        switch (dir){
            case -1:
                iteratedVar = oldWord.getI()-1;
                n = grid.length;
                int j = oldWord.getJ() + k;
                rowOrCol = getColumn(j);
                interdictChar = NOT_VERTICAL;
                toIgnore = NOT_HORIZONTAL;
                break;
            case 1:
                iteratedVar = oldWord.getJ()-1;
                n = grid[0].length;
                int i = oldWord.getI()+k;
                rowOrCol = grid[i];
                interdictChar = NOT_HORIZONTAL;
                toIgnore = NOT_VERTICAL;
                break;
            default:
                break;
        }
        createFirstPartOfRegex(iteratedVar, rowOrCol,interdictChar,toIgnore,regex);
        regex.append(chars[k]);
        createSecondPartOfRegex(iteratedVar+2, n, rowOrCol, interdictChar, toIgnore, regex);
        return regex;
    }

    private void createFirstPartOfRegex(int iteratedVar, char[] checkedRowOrColumn, char interdictedValue, char toIgnore, StringBuffer regex){
        int brackets = 0;
        while (iteratedVar >= 0 && checkedRowOrColumn[iteratedVar] != interdictedValue && checkedRowOrColumn[iteratedVar] != NOT_WRITE) {
            addSymbolToRegex(iteratedVar, checkedRowOrColumn, toIgnore, regex);
            brackets += addBracketToRegex(iteratedVar, checkedRowOrColumn, regex);
            iteratedVar--;
        }
        completeFirstPartOfRegex(regex, brackets);
    }

    private void createSecondPartOfRegex(int iteratedVar, int n, char[] checkedRowOrColumn, char interdictedValue, char toIgnore, StringBuffer regex){
        int brackets = 0;
        while (iteratedVar < n && checkedRowOrColumn[iteratedVar] != interdictedValue && checkedRowOrColumn[iteratedVar] != NOT_WRITE) {
            brackets += addBracketToRegex(iteratedVar, checkedRowOrColumn, regex);
            addSymbolToRegex(iteratedVar, checkedRowOrColumn, toIgnore, regex);
            iteratedVar++;
        }
        addClosedBracketsToRegex(regex, brackets);
    }

    private void completeFirstPartOfRegex(StringBuffer regex, int brackets){
        regex.reverse();
        if (regex.length() > 0)
            regex.insert(1, "?<begin>");
        addClosedBracketsToRegex(regex, brackets);
    }

    private void addSymbolToRegex(int iteratedVar, char[] rowOrColumn, char toIgnore, StringBuffer regex){
        if (rowOrColumn[iteratedVar] == EMPTY || rowOrColumn[iteratedVar] == toIgnore)
            regex.append('.');
        else
            regex.append(rowOrColumn[iteratedVar]);
    }

    private int addBracketToRegex(int iteratedVar, char[] rowOrColumn, StringBuffer regex){
        if (!isLetter(rowOrColumn[iteratedVar])) {
            regex.append('(');
            return 1;
        }
        return 0;
    }

    private void addClosedBracketsToRegex(StringBuffer regex, int brackets){
        for (int l = 0; l < brackets; l++) {
            regex.append(')');
            regex.append('?');
        }
    }

    private void findMatchesAndWrite(String regex, int dir, Word oldWord, int k){
        Pattern pattern = Pattern.compile(regex);
        Optional<String> newWord = dictionary.getMatches(pattern);
        if (newWord.isPresent()) {
            Matcher matcher = pattern.matcher(newWord.get());
            if (matcher.matches()) {
                int shift = 0;
                try {
                    String gr = matcher.group("begin");
                    if (gr!=null) {  //длина не равна 0
                        shift = gr.length();
                    }
                } catch (IllegalArgumentException e) {  //нет группы begin
                }
                int i1 = dir == -1 ? oldWord.getI() - shift : oldWord.getI() + k;
                int j1 = dir == -1 ? oldWord.getJ() + k : oldWord.getJ() - shift;
                Word word = new Word(newWord.get(), i1, j1, dir, dictionary.getNotUsedDefinition(newWord.get()));
                dictionary.addUsedWord(newWord.get());
                crossword.addWord(word);
                writeWord(word);
            }
        }
    }

    private boolean isLetter(char cell) {
        return (cell != EMPTY && cell != NOT_HORIZONTAL && cell != NOT_VERTICAL && cell != NOT_WRITE);
    }

    private char[] getColumn(int j){
        char[] column = new char[grid.length];
        for(int i = 0; i<grid.length; i++){
            column[i] = grid[i][j];
        }
        return column;
    }

    public void printGrid(){
        for(int i = 0; i<grid.length; i++){
            for (char c:grid[i]){
                System.out.printf("%s ", c);
            }
            System.out.println();
        }
    }

}
