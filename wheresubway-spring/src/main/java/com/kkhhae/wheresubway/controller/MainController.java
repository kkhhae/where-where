package com.kkhhae.wheresubway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

//접속제한 해제
@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class MainController {


    @GetMapping("/")
    public String hello(){
        return "main";
    }



}
