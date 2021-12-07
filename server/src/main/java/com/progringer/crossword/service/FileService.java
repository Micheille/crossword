package com.progringer.crossword.service;

import com.progringer.crossword.model.Crossword;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileService {
    Path crosswordFiles = Path.of("src","main","resources","static","crosswords");

    public void saveCrosswordToFile(Crossword crossword) throws IOException {
        Path path = Files.createFile(crosswordFiles.resolve(filenameFromName(crossword.getName(), ".kros")));
        //TODO запись объекта в файл
    }

    private String filenameFromName(String name, String exp){
        return name.replaceAll("\\W", "_")+exp;
    }
}
