package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.entity.UserEntity;
import com.kkhhae.wheresubway.security.CustomUser;
import com.kkhhae.wheresubway.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/error")
public class ErrorController {

    @GetMapping("/")
    public String error(@AuthenticationPrincipal CustomUser user, Model mo){
        UserEntity users = user.getUsers();
        mo.addAttribute("users", users);
        return "/error";
    }


}
