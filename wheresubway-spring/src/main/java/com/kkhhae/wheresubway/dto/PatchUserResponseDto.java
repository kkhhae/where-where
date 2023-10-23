package com.kkhhae.wheresubway.dto;


import com.kkhhae.wheresubway.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchUserResponseDto {

    private UserEntity userEntity;

}
