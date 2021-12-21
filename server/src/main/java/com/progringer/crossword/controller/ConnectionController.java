package com.progringer.crossword.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ConnectionController {

    @GetMapping("/ping")
    public void ping(){
    }

}
