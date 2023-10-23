package com.kkhhae.wheresubway.dto;

import com.kkhhae.wheresubway.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInResponseDTO {

    private String token;
    private int exprTime;

    private UserEntity user;


}
