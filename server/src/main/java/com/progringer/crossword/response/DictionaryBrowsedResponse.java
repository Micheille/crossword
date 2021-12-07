package com.progringer.crossword.response;

import com.progringer.crossword.dto.DictionaryDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DictionaryBrowsedResponse {
    private DictionaryDto dictionary;
}
