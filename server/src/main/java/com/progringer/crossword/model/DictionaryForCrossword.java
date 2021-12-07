package com.progringer.crossword.model;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DictionaryForCrossword{
    private List<Notion> notions;
    public DictionaryForCrossword (Dictionary dictionary){
        this.notions = dictionary.getWords();
    }
    public Notion getLongest(int n) {
        return notions.stream().filter(x->x.getWord().length()<=n).max(Comparator.comparingInt(x->x.getWord().length())).orElseThrow();
    }
    public Optional<Notion> getMatches(Pattern pattern) {
        return notions.stream().filter(x->{
            Matcher matcher = pattern.matcher(x.getWord());
            return matcher.matches();
        }).findFirst();
    }
    public void addUsedWord(Notion word){
        notions.remove(word);
    }
}
