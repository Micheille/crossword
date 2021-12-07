package com.progringer.crossword.response;

import com.progringer.crossword.model.Dictionary;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DictionaryBrowsedResponse {
    public Dictionary dictionary;
}
