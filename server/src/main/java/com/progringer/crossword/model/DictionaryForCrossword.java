package com.progringer.crossword.model;

import com.progringer.crossword.exception.DictionaryFileException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DictionaryForCrossword{
    private Dictionary dictionary;
    private List<Notion> usedNotions;
    public DictionaryForCrossword (Dictionary dictionary){
        this.dictionary = dictionary;
        this.usedNotions = new ArrayList<>();
    }
    public Notion getLongest(int n) {
        return dictionary.getWords().stream().filter(x->!usedNotions.contains(x)&&x.getWord().length()<=n).max(Comparator.comparingInt(x->x.getWord().length())).orElseThrow(DictionaryFileException::new);
    }
    public Optional<Notion> getMatches(Pattern pattern) {
        return dictionary.getWords().stream().filter(x->{
            Matcher matcher = pattern.matcher(x.getWord());
            return !usedNotions.contains(x)&&matcher.matches();
        }).findFirst();
    }
    public void addUsedWord(Notion word){
        usedNotions.add(word);
    }
}
