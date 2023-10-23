package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.Role.ApiKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping(value = "/api", produces = "application/json;charset=utf-8")
@Slf4j
public class ApiController {

    @GetMapping(value = "/stationInfo", produces = "application/json; charset=UTF-8")
    public ResponseEntity<String> getStationInfo(@RequestParam String keyword) {
        log.info("keyword : " + keyword);
        String result="";
        try {
            String trainApiEndpoint = "http://swopenAPI.seoul.go.kr/api/subway/" + ApiKey.TRAIN_API.getValue() + "/xml/realtimeStationArrival/0/5/" + keyword;

            log.info("Generated trainApiEndpoint: {}", trainApiEndpoint);

            RestTemplate restTemplate = new RestTemplate();
            result = restTemplate.getForObject(trainApiEndpoint, String.class);
            result = new String(result.getBytes("ISO-8859-1"), "UTF-8");

            log.info("rest result : {}", result);

            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            log.error("오류 발생:", e); // 오류의 스택 트레이스도 함께 로그에 기록
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }

    }


}
