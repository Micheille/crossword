package com.progringer.crossword.service;

import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.model.Dictionary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    void saveCrosswordToFile(Crossword crossword) throws IOException;
    void saveDictionaryToFile(Dictionary dictionary) throws IOException;
    Crossword browseCrosswordFromFile(String name) throws IOException, ClassNotFoundException;
    Dictionary browseDictionaryFromFile(String name) throws IOException, ClassNotFoundException;
    Dictionary parseFileToDictionary(MultipartFile file) throws IOException;
}
