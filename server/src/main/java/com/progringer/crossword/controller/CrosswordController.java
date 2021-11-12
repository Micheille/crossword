package com.progringer.crossword.controller;

import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.CrosswordGenerator;
import com.progringer.crossword.response.CrosswordResponse;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Min;

@RestController
@Validated
public class CrosswordController {

    @GetMapping("/generate")
    public CrosswordResponse generateCrossword(@RequestParam @Min(10) Integer n, @RequestParam @Min(10) Integer m, @RequestParam String dictionary) {
        CrosswordGenerator generator = new CrosswordGenerator(n, m, dictionary);
        Crossword crossword = generator.generate();
        return new CrosswordResponse(crossword);
    }

}
