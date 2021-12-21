package com.progringer.crossword.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class Notion implements Serializable {
    private String word;
    private String definition;
}
