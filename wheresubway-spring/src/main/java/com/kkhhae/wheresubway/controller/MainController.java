package com.kkhhae.wheresubway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

//접속제한 해제
//@CrossOrigin(originPatterns = "http://localhost:8080")
@RestController
@RequestMapping("/")
public class MainController {

    @GetMapping("/")
    public String hello(){
        return "main";
    }

}
