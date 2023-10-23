package com.kkhhae.wheresubway.security;

import com.kkhhae.wheresubway.entity.UserEntity;
import com.kkhhae.wheresubway.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    //시큐리티 사용을 위해 무조건 구현해야 함
    //시큐리티가 로그인처리해주고, 로그인 시 자동으로 호출되는 메서드
    @Override
    public UserEntity loadUserByUsername(String userEmail)  throws UsernameNotFoundException {
        UserEntity findUser = userRepository.findByUserEmail(userEmail);

        if(findUser == null){
            throw new UsernameNotFoundException("해당 사용자가 존재하지 않습니다: " + userEmail);
        }
        return findUser;
    }




}
