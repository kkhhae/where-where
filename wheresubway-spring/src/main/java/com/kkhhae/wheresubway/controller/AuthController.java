package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.dto.ResponseDTO;
import com.kkhhae.wheresubway.dto.SignFindDTO;
import com.kkhhae.wheresubway.dto.SignInDTO;
import com.kkhhae.wheresubway.dto.SignupDTO;
import com.kkhhae.wheresubway.entity.UserEntity;
import com.kkhhae.wheresubway.repository.UserRepository;
import com.kkhhae.wheresubway.service.AuthService;
import com.kkhhae.wheresubway.service.MailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@Slf4j
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private MailService mailService;

    //회원가입
    @PostMapping("/auth/signUp")
    public ResponseDTO<?> signUp(@RequestBody SignupDTO requestBody){
        System.out.println(requestBody.toString());

        ResponseDTO<?> result = authService.signUp(requestBody);
        return result;
    }

    //로그인
    @PostMapping("/auth/signIn")
    public ResponseDTO<?> signIn(@RequestBody SignInDTO requestBody){
        System.out.println(requestBody.toString());

        ResponseDTO<?> result = authService.signIn(requestBody);
        return result;
    }

    //ID찾기
    @PostMapping("/auth/signFindId")
    public ResponseDTO<?> signFind(@RequestBody SignFindDTO requestBody){
        System.out.println(requestBody.toString());

        ResponseDTO<?> result = authService.signFindEmail(requestBody);
        return result;
    }

    //이메일 인증
    @PostMapping("/emailAccess")
    public ResponseDTO<?> emailAccess(@RequestBody SignInDTO requestBody) throws Exception {
        System.out.println(requestBody.getUserEmail());
        try {
            String code = mailService.sendSimpleMessage(requestBody.getUserEmail());
            return ResponseDTO.setSuccess("success to send email!", code);

        } catch (Exception e) {
            e.printStackTrace();  // 콘솔에 오류를 출력
            return ResponseDTO.setFailed("fail to send email");
        }
    }

}
