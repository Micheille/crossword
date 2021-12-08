package com.progringer.crossword.service.impl;

import com.progringer.crossword.service.FileService;
import com.progringer.crossword.service.ListService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Log4j2
@Service
public class ListServiceImpl implements ListService {

    @Autowired
    private FileService fileService;

    Path crosswordFiles = Path.of("src","main","resources","static","crosswords");
    Path dictionariesFiles = Path.of("src","main","resources","static","dictionaries");

    @Override
    public List<String> getDictionariesNames() throws IOException {
        try(Stream<Path> entries = Files.list(dictionariesFiles)){
            return entries.filter(Files::isRegularFile).map(x-> {
                try {
                    return Files.newBufferedReader(x, Charset.forName("windows-1251")).readLine();
                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                }
                return null;
            }).filter(Objects::nonNull).collect(Collectors.toList());
        }
    }

    @Override
    public List<String> getCrosswordNames() throws IOException {
        try(Stream<Path> entries = Files.list(crosswordFiles)){
            return entries.filter(Files::isRegularFile).map(x-> {
                try {
                    return fileService.browseCrosswordFromFile(x).getName();
                } catch (IOException | ClassNotFoundException e) {
                    log.error(e.getMessage(), e);
                }
                return null;
            }).filter(Objects::nonNull).collect(Collectors.toList());
        }
    }
}
