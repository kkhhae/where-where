package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.dto.ResponseDTO;
import com.kkhhae.wheresubway.controller.ApiController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@Slf4j
@RequiredArgsConstructor
public class SearchController {

    private final ApiController apiController;  // ApiController 주입

    @GetMapping("/map")
    public String kakaoMap(@ModelAttribute("keyword") String keyword){
        return "/search/map";
    }

    @PostMapping("/map")
    public String kakaoMap(@RequestBody ResponseDTO<String> responseDTO, Model model
    , @ModelAttribute String keyword ){

        if(keyword != null) {
            model.addAttribute("keyword", keyword);
        }
        // ApiController의 결과를 받아옵니다.
        ResponseEntity<String> response = apiController.getStationInfo(responseDTO.getData());
        log.info("response api : {}", response.toString());
        String stationInfo = response.getBody();

        // 결과를 모델에 추가합니다.
        model.addAttribute("stationInfo", stationInfo);

        return "/search/map";
    }



}
