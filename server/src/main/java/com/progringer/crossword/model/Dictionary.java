package com.progringer.crossword.model;

import com.progringer.crossword.exception.DictionaryFileException;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Dictionary {
    private Path file;
    private Map<String, String> usedWords;
    private Map<String, String> dict;
    public Dictionary(Path file){
        this.file = file;
        this.usedWords = new HashMap<>();
        dict = new HashMap<>();
        try {
            getWords();
        } catch (IOException e) {
            throw new DictionaryFileException();
        }
    }
    private void getWords() throws IOException {
        Files.lines(file, Charset.forName("windows-1251")).map(line->line.split("\\s",2)).forEach(x->dict.put(x[0], x[1]));
    }
    public String getLongest(int n) {
        return dict.keySet().stream().filter(x->x.length()<=n).max(Comparator.comparingInt(x->x.length())).orElseThrow();
    }
    public Optional<String> getMatches(Pattern pattern) {
        return dict.keySet().stream().filter(x->{
            Matcher matcher = pattern.matcher(x);
            return matcher.matches();
        }).findFirst();
    }
    public void addUsedWord(String word){
        String definit = dict.remove(word);
        usedWords.put(word, definit);
    }
    public String getUsedDefinition(String word){
        return usedWords.get(word);
    }
    public String getNotUsedDefinition(String word){
        return dict.get(word);
    }
}
