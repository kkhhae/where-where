package com.kkhhae.wheresubway.Role;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UserRole {

    //사용자, 관리자
    USER("ROLE_USER"), ADMIN("ROLE_ADMIN"),
    //온라인,오프라인
    ONLINE("ROLE_ONLINE"),OFFLINE("ROLE_OFFLINE");

    private final String value;

}
