package com.kkhhae.wheresubway.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInDTO {

    @NotBlank
    private String userEmail;
    @NotBlank
    private String userPassword;


}
