package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.Role.ApiKey;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

//컨트롤러 전역 세팅하기 (api키)
@ControllerAdvice
public class GlobalControllerAdvice {
    @ModelAttribute("kakaoApiKey")
    public String kakaoApiKey() {
        return ApiKey.KAKAO_API.getValue();
    }

}
