package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.dto.ResponseDTO;
import com.kkhhae.wheresubway.entity.BoardEntity;
import com.kkhhae.wheresubway.entity.PopularSearchEntity;
import com.kkhhae.wheresubway.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/top3")
    public ResponseDTO<List<BoardEntity>> getTop3(){
        return boardService.getTop3();
    }

    @GetMapping("/list")
    public ResponseDTO<List<BoardEntity>> getList(){
        return  boardService.getList();
    }

    @GetMapping("/popularsearchList")
    public ResponseDTO<List<PopularSearchEntity>> getPopularsearchList(){
        return boardService.getPopularsearchList();
    }

    @GetMapping("/search/{boardTitle}")
    public ResponseDTO<List<BoardEntity>> getSearchList(@PathVariable("title")String title){
        return null;
    }

}

