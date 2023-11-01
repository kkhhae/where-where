package com.kkhhae.wheresubway.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignFindDTO {

    @NotBlank
    private String userEmail;
    @NotBlank
    private String userPassword;
    @NotBlank
    private String userEmailCheck;
    @NotBlank
    private String userEmailCheckInput;

}

