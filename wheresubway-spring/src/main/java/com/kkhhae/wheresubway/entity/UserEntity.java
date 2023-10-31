package com.kkhhae.wheresubway.entity;

import com.kkhhae.wheresubway.Role.UserRole;
import com.kkhhae.wheresubway.dto.SignupDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@Data
@Builder
@NoArgsConstructor
@Entity(name = "users")
@Table(name = "users")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    private int userId;
    private String userEmail;
    private String userPassword;
    private String userNickname;
    private String userAddress;
    private UserRole role_access;   //사용자,관리자
    private UserRole role_status;   //온라인,오프라인

    //초기화
    public UserEntity(SignupDTO dto){
        this.userEmail = dto.getUserEmail();
        this.userPassword = dto.getUserPassword();
        this.userNickname = dto.getUserNickname();
        this.userAddress = dto.getUserAddress() + " " + dto.getUserAddressDetail();
    }



    //시큐리티 설정
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    //계정만료여부
    @Override
    public boolean isAccountNonExpired() {
        return true; //만료x
    }
    //계정잠금여부
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //계정페스워드만료
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정사용가능
    @Override
    public boolean isEnabled() {
        return true;
    }
}
