package com.progringer.crossword.controller;

import com.progringer.crossword.dto.CrosswordDto;
import com.progringer.crossword.dto.DictionaryDto;
import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.model.Dictionary;
import com.progringer.crossword.response.*;
import com.progringer.crossword.service.CrosswordGeneratorService;
import com.progringer.crossword.service.FileService;
import com.progringer.crossword.service.ListService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@RestController
@EnableCaching
@Validated
public class CrosswordController {

    @Autowired
    private FileService fileService;
    @Autowired
    private ListService listService;
    @Autowired
    private CrosswordGeneratorService crosswordGeneratorService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/generate")
    public CrosswordGeneratedResponse generateCrossword(@RequestParam @Min(10) Integer n, @RequestParam @Min(10) Integer m, @RequestParam String dictionary) throws IOException, ClassNotFoundException {
        Crossword crossword = crosswordGeneratorService.generateCrossword(n, m, dictionary);
        return new CrosswordGeneratedResponse(crossword);
    }

    @PostMapping("/save_crossword")
    @Caching(evict = {
            @CacheEvict(value = "crossword", key = "#name"),
            @CacheEvict(value = "crossword_list", allEntries = true)
    })
    @ResponseStatus(HttpStatus.CREATED)
    public CrosswordSavedResponse saveCrossword(@RequestParam @NotEmpty String name, @RequestBody @NotNull CrosswordDto crosswordDto) throws IOException {
        Crossword crossword = convertToCrosswordEntity(crosswordDto);
        crossword.setName(name);
        fileService.saveCrosswordToFile(crossword);
        return new CrosswordSavedResponse(name);
    }

    @PostMapping("/save_dictionary")
    @Caching(evict = {
            @CacheEvict(value = "dictionary", key = "#name"),
            @CacheEvict(value = "dictionary_list", allEntries = true)
    })
    @ResponseStatus(HttpStatus.CREATED)
    public DictionarySavedResponse saveDictionary(@RequestParam @NotEmpty String name, @RequestBody @NotNull DictionaryDto dictionaryDto) throws IOException {
        Dictionary dictionary = convertToDictionaryEntity(dictionaryDto);
        dictionary.setName(name);
        fileService.saveDictionaryToFile(dictionary);
        return new DictionarySavedResponse(dictionary.getName());
    }

    @GetMapping("/browse_crossword")
    @Cacheable(value = "crossword", key = "#name")
    public CrosswordBrowsedResponse browseCrossword(@RequestParam @NotEmpty String name) throws IOException, ClassNotFoundException {
        Crossword crossword = fileService.browseCrosswordFromFile(name);
        return new CrosswordBrowsedResponse(convertToCrosswordDto(crossword));
    }

    @GetMapping("/browse_dictionary")
    @Cacheable(value = "dictionary", key = "#name")
    public DictionaryBrowsedResponse browseDictionary(@RequestParam @NotEmpty String name) throws IOException, ClassNotFoundException {
        Dictionary dictionary = fileService.browseDictionaryFromFile(name);
        return new DictionaryBrowsedResponse(convertToDictionaryDto(dictionary));
    }

    @GetMapping("/list_of_crosswords")
    @Cacheable(value = "crossword_list")
    public ListOfCrosswordsResponse getAllCrosswords() throws IOException {
        return new ListOfCrosswordsResponse(listService.getCrosswordNames());
    }

    @GetMapping("/list_of_dictionaries")
    @Cacheable(value = "dictionary_list")
    public ListOfDictsResponse getAllDicts() throws IOException {
        return new ListOfDictsResponse(listService.getDictionariesNames());
    }

    @PostMapping("/upload_dictionary")
    @Caching(evict = {
            @CacheEvict(value = "dictionary", key = "#name"),
            @CacheEvict(value = "dictionary_list", allEntries = true)
    })
    public DictionarySavedResponse uploadDictionary(@RequestParam MultipartFile file, @RequestParam @NotEmpty String name) throws IOException {
        Dictionary dictionary = fileService.parseFileToDictionary(file);
        dictionary.setName(name);
        fileService.saveDictionaryToFile(dictionary);
        return new DictionarySavedResponse(name);
    }

    private CrosswordDto convertToCrosswordDto(Crossword crossword){
        return modelMapper.map(crossword, CrosswordDto.class);
    }

    private Crossword convertToCrosswordEntity(CrosswordDto crosswordDto){
        return modelMapper.map(crosswordDto, Crossword.class);
    }

    private DictionaryDto convertToDictionaryDto(Dictionary dictionary){
        return modelMapper.map(dictionary, DictionaryDto.class);
    }

    private Dictionary convertToDictionaryEntity(DictionaryDto dictionaryDto){
        return modelMapper.map(dictionaryDto, Dictionary.class);
    }
}
