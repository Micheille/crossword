package com.progringer.crossword.service;

import java.io.IOException;
import java.util.List;

public interface ListService{
    List<String> getDictionariesNames() throws IOException;
    List<String> getCrosswordNames() throws IOException;
}
