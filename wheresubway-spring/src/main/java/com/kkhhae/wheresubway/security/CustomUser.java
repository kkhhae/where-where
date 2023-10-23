package com.kkhhae.wheresubway.security;

import com.kkhhae.wheresubway.entity.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Arrays;
import java.util.Collection;

@Getter
public class CustomUser extends User { //User -> ...security로 CustomUser == principal

    private UserEntity users; //우리가 사용하는 회원정보 담는 객체.

    //CustomUser : 회원정보를 들고다니는 거 생각하면 편함
    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }
    

    //우리 버전의 생성자 -> 부모 생성자 호출하는 패턴은 유지
    public CustomUser(UserEntity users){ //외부에서 member받아 CustomUser로
        super(
                users.getUsername(),
                users.getPassword(),
                Arrays.asList(
                        new SimpleGrantedAuthority(users.getRole_access().getValue()),
                        new SimpleGrantedAuthority(users.getRole_status().getValue())
                )
        );
        this.users = users;
    }
}
