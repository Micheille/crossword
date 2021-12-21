package com.progringer.crossword.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ListOfCrosswordsResponse {
    private List<String> names;
}
