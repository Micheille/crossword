package com.progringer.crossword.controller;

import com.progringer.crossword.dto.CrosswordDto;
import com.progringer.crossword.dto.DictionaryDto;
import com.progringer.crossword.exception.DictionaryFileException;
import com.progringer.crossword.model.Crossword;
import com.progringer.crossword.model.Dictionary;
import com.progringer.crossword.response.*;
import com.progringer.crossword.service.CrosswordGeneratorService;
import com.progringer.crossword.service.FileService;
import com.progringer.crossword.service.ListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@RestController
@CrossOrigin
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

    @Operation(summary = "Генерация кроссворда. Возвращает кроссворд, но автоматически на сервер не сохраняет")
    @GetMapping("/generate")
    public CrosswordGeneratedResponse generateCrossword(@Parameter(description = "Размер матрицы по вертикали. Обязательный. Не меньше 10.") @RequestParam @Min(10) Integer n, @Parameter(description = "Размер матрицы по горизонтали. Обязательный. Не меньше 10.") @RequestParam @Min(10) Integer m, @Parameter(description = "Имя словаря") @RequestParam String dictionary) throws IOException, ClassNotFoundException {
        Crossword crossword = crosswordGeneratorService.generateCrossword(n, m, dictionary);
        return new CrosswordGeneratedResponse(crossword);
    }

    @Operation(summary = "Сохранить кроссворд в файл на сервер")
    @PostMapping("/save_crossword")
    @Caching(evict = {
            @CacheEvict(value = "crossword", key = "#name"),
            @CacheEvict(value = "crossword_list", allEntries = true)
    })
    @ResponseStatus(HttpStatus.CREATED)
    public CrosswordSavedResponse saveCrossword(@Parameter(description = "Имя кроссворда. Не может быть пустым.") @RequestParam @NotEmpty String name, @Parameter(description = "Кроссворд, который будем сохранять. Ожидается в формате json.") @RequestBody @NotNull CrosswordDto crosswordDto) throws IOException {
        Crossword crossword = convertToCrosswordEntity(crosswordDto);
        crossword.setName(name);
        fileService.saveCrosswordToFile(crossword);
        return new CrosswordSavedResponse(name);
    }

    @Operation(summary = "Сохранить словарь в файл на сервер")
    @PostMapping("/save_dictionary")
    @Caching(evict = {
            @CacheEvict(value = "dictionary", key = "#name"),
            @CacheEvict(value = "dictionary_list", allEntries = true)
    })
    @ResponseStatus(HttpStatus.CREATED)
    public DictionarySavedResponse saveDictionary(@Parameter(description = "Имя словаря. Не может быть пустым.") @RequestParam @NotEmpty String name, @Parameter(description = "Словарь, который будем сохранять. Ожидается в формате json.") @RequestBody @NotNull DictionaryDto dictionaryDto) throws IOException {
        Dictionary dictionary = convertToDictionaryEntity(dictionaryDto);
        dictionary.setName(name);
        fileService.saveDictionaryToFile(dictionary);
        return new DictionarySavedResponse(dictionary.getName());
    }

    @Operation(summary = "Получить кроссворд по имени с сервера. Кэшируемая ручка, инвалидируется при сохранении кроссворда с таким же именем")
    @GetMapping("/browse_crossword")
    @Cacheable(value = "crossword", key = "#name")
    public CrosswordBrowsedResponse browseCrossword(@Parameter(description = "Имя требуемого кроссворда. Не может быть пустым.") @RequestParam @NotEmpty String name) throws IOException, ClassNotFoundException {
        Crossword crossword = fileService.browseCrosswordFromFile(name);
        return new CrosswordBrowsedResponse(convertToCrosswordDto(crossword));
    }

    @Operation(summary = "Получить словарь по имени с сервера. Кэшируемая ручка, инвалидируется при сохранении или загрузке словаря с таким же именем")
    @GetMapping("/browse_dictionary")
    @Cacheable(value = "dictionary", key = "#name")
    public DictionaryBrowsedResponse browseDictionary(@Parameter(description = "Имя требуемого словаря. Не может быть пустым.") @RequestParam @NotEmpty String name) throws IOException, ClassNotFoundException {
        Dictionary dictionary = fileService.browseDictionaryFromFile(name);
        return new DictionaryBrowsedResponse(convertToDictionaryDto(dictionary));
    }

    @Operation(summary = "Список имен всех существующих кроссвордов. Кэширумая ручка, инвалидируется при сохранении нового кроссворда")
    @GetMapping("/list_of_crosswords")
    @Cacheable(value = "crossword_list")
    public ListOfCrosswordsResponse getAllCrosswords() throws IOException {
        return new ListOfCrosswordsResponse(listService.getCrosswordNames());
    }

    @Operation(summary = "Список имен всех существующих словарей. Кэширумая ручка, инвалидируется при сохранении или нового словаря")
    @GetMapping("/list_of_dictionaries")
    @Cacheable(value = "dictionary_list")
    public ListOfDictsResponse getAllDicts() throws IOException {
        return new ListOfDictsResponse(listService.getDictionariesNames());
    }

    @Operation(summary = "Загрузить файл со словарем на сервер")
    @PostMapping("/upload_dictionary")
    @Caching(evict = {
            @CacheEvict(value = "dictionary", key = "#name"),
            @CacheEvict(value = "dictionary_list", allEntries = true)
    })
    public DictionarySavedResponse uploadDictionary(@Parameter(description = "Файл словаря") @RequestParam MultipartFile file, @Parameter(description = "Имя, под которым будет сохраняться словарь. Не может быть пустым") @RequestParam @NotEmpty String name) throws IOException {
        Dictionary dictionary = fileService.parseFileToDictionary(file);
        if (dictionary==null)
            throw new DictionaryFileException();
        dictionary.setName(name);
        fileService.saveDictionaryToFile(dictionary);
        return new DictionarySavedResponse(name);
    }

    @Operation(summary = "Получить файл справки")
    @GetMapping("/get_info")
    public ResponseEntity<Resource> getInfo() throws IOException {
        ByteArrayResource resource = fileService.getInfoFile();
        return ResponseEntity.ok()
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
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
