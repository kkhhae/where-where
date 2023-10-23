package com.kkhhae.wheresubway.service;

import com.kkhhae.wheresubway.dto.ResponseDTO;
import com.kkhhae.wheresubway.entity.BoardEntity;
import com.kkhhae.wheresubway.entity.PopularSearchEntity;
import com.kkhhae.wheresubway.repository.BoardRepository;
import com.kkhhae.wheresubway.repository.PopularSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private PopularSearchRepository popularSearchRepository;

    //탑3 리스트 출력(7일기준)
    public ResponseDTO<List<BoardEntity>> getTop3(){
        List<BoardEntity> boardList = new ArrayList<BoardEntity>();
        //현재 시점을 instant.now로 가져와 7일을 빼고 일수를 기준으로 표현함
        //현재 시점으로부터 7일 이전의 날짜를 java.util.Date 형식으로 반환합니다.
        Date date = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));

        try{
            boardRepository.findTop3ByBoardWriterDateAfterOrderByBoardLikeCountDesc(date);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.setFailed("db error!");
        }

        return ResponseDTO.setSuccess("success", boardList);
    }

    //역순으로 게시글 뽑기
    public ResponseDTO<List<BoardEntity>> getList(){
        List<BoardEntity> boardList = new ArrayList<BoardEntity>();

        try {
            boardList = boardRepository.findByOrderByBoardWriterDateDesc();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.setFailed("db error!");
        }
        return ResponseDTO.setSuccess("success", boardList);
    }

    //인기많은 게시글
    public ResponseDTO<List<PopularSearchEntity>> getPopularsearchList(){
        List<PopularSearchEntity> popularList = new ArrayList<PopularSearchEntity>();

        try {
            popularList = popularSearchRepository.findTop10ByOrderByPopularSearchCountDesc();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.setFailed("db error!");
        }

        return ResponseDTO.setSuccess("Success", popularList);
    }


    public ResponseDTO<List<BoardEntity>> getSearchList(String boardTitle){
        List<BoardEntity> boardList = new ArrayList<BoardEntity>();

        try {
            boardList = boardRepository.findByBoardTitleContains(boardTitle);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.setFailed("db error!");
        }

        return ResponseDTO.setSuccess("success",boardList);
    }


}
