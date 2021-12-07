package com.progringer.crossword.controller;

import com.progringer.crossword.dto.CrosswordDto;
import com.progringer.crossword.dto.DictionaryDto;
import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.CrosswordGenerator;
import com.progringer.crossword.model.Dictionary;
import com.progringer.crossword.response.*;
import com.progringer.crossword.service.FileService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@RestController
@Validated
public class CrosswordController {

    @Autowired
    private FileService fileService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/generate")
    public CrosswordGeneratedResponse generateCrossword(@RequestParam @Min(10) Integer n, @RequestParam @Min(10) Integer m, @RequestParam String dictionary) {
        CrosswordGenerator generator = new CrosswordGenerator(n, m, dictionary);
        Crossword crossword = generator.generate();
        return new CrosswordGeneratedResponse(crossword);
    }
//сохранение кроссвордов и словарей понятий в файлы
//загрузку их из файлов
//сохранение куки-файлов с данными о разгаданных словах и кроссвордах игрока.
    @PostMapping("/save_crossword")
    @ResponseStatus(HttpStatus.CREATED)
    public CrosswordSavedResponse saveCrossword(@RequestParam @NotEmpty String name, @RequestBody @NotNull CrosswordDto crosswordDto) throws IOException {
        Crossword crossword = convertToEntity(crosswordDto);
        crossword.setName(name);
        fileService.saveCrosswordToFile(crossword);
        return new CrosswordSavedResponse(name);
    }

    @PostMapping("/save_dictionary")
    @ResponseStatus(HttpStatus.CREATED)
    public DictionarySavedResponse saveDictionary(@RequestParam @NotEmpty String name, @RequestBody @NotNull DictionaryDto dictionaryDto){
        //TODO
        return new DictionarySavedResponse(name);
    }

    @GetMapping("/browse_crossword")
    public CrosswordBrowsedResponse browseCrossword(@RequestParam @NotEmpty String name){
        //TODO
        return new CrosswordBrowsedResponse(new Crossword(10,10));
    }

    @GetMapping("/browse_dictionary")
    public DictionaryBrowsedResponse browseDictionary(@RequestParam @NotEmpty String name){
        //TODO
        return new DictionaryBrowsedResponse(new Dictionary(Path.of("src","main","resources","static", "slovar.dict")));
    }

    @GetMapping("/list_of_crosswords")
    public ListOfCrosswordsResponse getAllCrosswords(){
        return new ListOfCrosswordsResponse(List.of("Цветы", "Природа"));
    }

    @GetMapping("/list_of_dictionaries")
    public ListOfDictsResponse getAllDicts(){
        return new ListOfDictsResponse(List.of("Природные явления", "Словарь Ожегова"));
    }

    private CrosswordDto convertToDto(Crossword crossword){
        CrosswordDto crosswordDto = modelMapper.map(crossword, CrosswordDto.class);
        return crosswordDto;
    }

    private Crossword convertToEntity(CrosswordDto crosswordDto){
        Crossword crossword = modelMapper.map(crosswordDto, Crossword.class);
        return crossword;
    }
}
