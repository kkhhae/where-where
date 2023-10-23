package com.kkhhae.wheresubway.service;

import com.kkhhae.wheresubway.dto.ResponseDTO;
import com.kkhhae.wheresubway.dto.SignInDTO;
import com.kkhhae.wheresubway.dto.SignInResponseDTO;
import com.kkhhae.wheresubway.dto.SignupDTO;
import com.kkhhae.wheresubway.entity.UserEntity;
import com.kkhhae.wheresubway.repository.UserRepository;
import com.kkhhae.wheresubway.security.TokenProvider;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
//DB에 값 주고 받을 때 transactional 사용해야 됨
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenProvider tokenProvider;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    //회원가입
    public ResponseDTO<?> signUp(SignupDTO dto){
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();
        String userPasswordCheck = dto.getUserPasswordCheck();

        //이메일 중복체크 (try-catch 예외처리)
        try {
            if(userRepository.existsById(userEmail)){
                return ResponseDTO.setFailed("ur email already signup");
            }
        }catch (Exception e){
            return ResponseDTO.setFailed("database error! plz retry");
        }

        //비밀번호 불일치 시
        if(!userPassword.equals(userPasswordCheck)){
            return ResponseDTO.setFailed("password not matched");
        }


        //userEntity 생성 + 회원가입처리
        UserEntity userEntity = new UserEntity(dto);
        //비밀번호 암호화
        userEntity.setUserPassword(passwordEncoder.encode(userPassword));

        try {
            userRepository.save(userEntity);
        }catch (Exception e){
            return ResponseDTO.setFailed("database error");
        }

        //성공 시 success
        return ResponseDTO.setSuccess("Signup success", null);
    }

    //로그인
    public ResponseDTO<SignInResponseDTO>  signIn(SignInDTO dto){
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();

        UserEntity userEntity = null;

        try{
            userEntity = userRepository.findByUserEmail(userEmail);
            //이메일 검사
            if(userEntity == null){
                return ResponseDTO.setFailed("Sign In Failed");
            }
            //비밀번호 검사
            if(!passwordEncoder.matches(userPassword, userEntity.getUserPassword())){
                return ResponseDTO.setFailed("Sign In Failed");
            }
        }catch (Exception e){
            return ResponseDTO.setFailed("database error");
        }

        try{
            userEntity = userRepository.findById(userEmail).get();
        }catch (Exception e){
            return ResponseDTO.setFailed("database error");
        }
        //password 초기화 (테스트용이라 일단 주석처리)
//        userEntity.setUserPassword("");

        //토큰 생성
        String token = tokenProvider.create(userEmail);
        int exprTime = 3600000;

        SignInResponseDTO signInResponseDTO = new SignInResponseDTO(token,exprTime,userEntity);
        return ResponseDTO.setSuccess("signIn success",signInResponseDTO);
    }

}
