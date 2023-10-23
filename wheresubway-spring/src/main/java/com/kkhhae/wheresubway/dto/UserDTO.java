package com.kkhhae.wheresubway.dto;

import com.kkhhae.wheresubway.Role.UserRole;
import com.kkhhae.wheresubway.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {

    private String userEmail;
    private String userPassword;
    private UserRole user_access;
    private UserRole user_status;

}
