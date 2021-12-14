package com.progringer.crossword.response;

import com.progringer.crossword.dto.CrosswordDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CrosswordBrowsedResponse {
    private CrosswordDto crossword;
}
