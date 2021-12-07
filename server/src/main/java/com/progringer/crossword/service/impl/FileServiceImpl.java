package com.progringer.crossword.service.impl;

import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.model.Dictionary;
import com.progringer.crossword.model.Notion;
import com.progringer.crossword.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileServiceImpl implements FileService {
    Path crosswordFiles = Path.of("src","main","resources","static","crosswords");
    Path dictionariesFiles = Path.of("src","main","resources","static","dictionaries");

    @Override
    public void saveCrosswordToFile(Crossword crossword) throws IOException {
        Path path = Files.createFile(crosswordFiles.resolve(filenameFromName(crossword.getName(), ".kros")));
        try(ObjectOutputStream out = new ObjectOutputStream(Files.newOutputStream(path))){
            out.writeObject(crossword);
        }
    }

    @Override
    public void saveDictionaryToFile(Dictionary dictionary) throws IOException {
        Path path = Files.createFile(dictionariesFiles.resolve(filenameFromName(dictionary.getName(), ".dict")));
        try (ObjectOutputStream out = new ObjectOutputStream(Files.newOutputStream(path))){
            out.writeObject(dictionary);
        }
    }

    @Override
    public Crossword browseCrosswordFromFile(String name) throws IOException, ClassNotFoundException {
        Path path = crosswordFiles.resolve(filenameFromName(name, ".kros"));
        try (ObjectInputStream in = new ObjectInputStream(Files.newInputStream(path))){
            return (Crossword) in.readObject();
        }
    }

    @Override
    public Dictionary browseDictionaryFromFile(String name) throws IOException, ClassNotFoundException {
        Path path = dictionariesFiles.resolve(filenameFromName(name, ".dict"));
        try (ObjectInputStream in = new ObjectInputStream(Files.newInputStream(path))){
            return (Dictionary) in.readObject();
        }
    }
    @Override
    public Dictionary parseFileToDictionary(MultipartFile file) throws IOException {
        Dictionary dictionary = new Dictionary(filenameFromName(file.getOriginalFilename(), ""));
        new BufferedReader(new InputStreamReader(file.getInputStream(), Charset.forName("windows-1251"))).lines().map(line->line.split("\\s",2)).forEach(x->dictionary.addNotion(new Notion(x[0], x[1])));
        saveDictionaryToFile(dictionary);
        return dictionary;
    }

    private String filenameFromName(String name, String exp){
        return name.replaceAll("[^[a-zA-Z0-9а-яА-ЯёЁ]]", "_")+exp;
    }

}
