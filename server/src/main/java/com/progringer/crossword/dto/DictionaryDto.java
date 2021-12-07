package com.progringer.crossword.dto;

import com.progringer.crossword.model.Notion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DictionaryDto {
    private String name;
    private List<Notion> words;
}
