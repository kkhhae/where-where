package com.kkhhae.wheresubway.controller;

import com.kkhhae.wheresubway.dto.PatchUserDto;
import com.kkhhae.wheresubway.dto.PatchUserResponseDto;
import com.kkhhae.wheresubway.dto.ResponseDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @PatchMapping("/")
    public ResponseDTO<PatchUserResponseDto> patchUser(
            @AuthenticationPrincipal String userEmail,
            @RequestBody PatchUserDto requestBody){


        return null;
    }
}
