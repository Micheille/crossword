package com.progringer.crossword.service;

import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.model.Dictionary;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;

public interface FileService {
    void saveCrosswordToFile(Crossword crossword) throws IOException;
    void saveDictionaryToFile(Dictionary dictionary) throws IOException;
    Crossword browseCrosswordFromFile(String name) throws IOException, ClassNotFoundException;
    Crossword browseCrosswordFromFile(Path path) throws IOException, ClassNotFoundException;
    Dictionary browseDictionaryFromFile(String name) throws IOException, ClassNotFoundException;
    Dictionary parseFileToDictionary(MultipartFile file) throws IOException;
    ByteArrayResource getInfoFile() throws IOException;
}
