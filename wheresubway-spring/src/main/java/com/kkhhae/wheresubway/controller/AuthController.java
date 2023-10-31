package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.dto.ResponseDTO;
import com.kkhhae.wheresubway.dto.SignInDTO;
import com.kkhhae.wheresubway.dto.SignupDTO;
import com.kkhhae.wheresubway.entity.UserEntity;
import com.kkhhae.wheresubway.repository.UserRepository;
import com.kkhhae.wheresubway.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signUp")
    public ResponseDTO<?> signUp(@RequestBody SignupDTO requestBody){
        System.out.println(requestBody.toString());

        //authservice에 requestbody로 받아온 데이터 보내주기
        ResponseDTO<?> result = authService.signUp(requestBody);
        return result;
    }

    @PostMapping("/signIn")
    public ResponseDTO<?> signIn(@RequestBody SignInDTO requestBody){
        System.out.println(requestBody.toString());

        ResponseDTO<?> result = authService.signIn(requestBody);
        return result;
    }
}
