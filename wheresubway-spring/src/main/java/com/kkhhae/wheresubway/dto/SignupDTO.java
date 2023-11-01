package com.kkhhae.wheresubway.dto;

import com.kkhhae.wheresubway.Role.UserRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDTO {

    private String userEmail;
    private String userPassword;
    private String userPasswordCheck;
    private String userNickname;
    private String userAddress;
    private String userAddressDetail;
    private UserRole role_access;   //사용자,관리자
    private UserRole role_status;   //온라인,오프라인


}
