package com.kkhhae.wheresubway.service;

import com.kkhhae.wheresubway.Role.UserRole;
import com.kkhhae.wheresubway.dto.*;
import com.kkhhae.wheresubway.entity.UserEntity;
import com.kkhhae.wheresubway.repository.UserRepository;
import com.kkhhae.wheresubway.security.TokenProvider;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Objects;

@Service
@Slf4j
//DB에 값 주고 받을 때 transactional 사용해야 됨
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private MailService mailService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    //회원가입
    public ResponseDTO<?> signUp(SignupDTO dto){
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();
        String userPasswordCheck = dto.getUserPasswordCheck();
        log.info(userEmail);

        log.info("dto : {}", dto);

        UserEntity findEm = userRepository.findByUserEmail(userEmail);
        log.info(String.valueOf(findEm));
        //이메일 중복체크 (try-catch 예외처리)
        try {
            if(findEm != null){
                log.info("이메일 중복체크");
                return ResponseDTO.setFailed("ur email already signup");
            }
        }catch (Exception e){
            log.info("db 에러");
            return ResponseDTO.setFailed("database error! plz retry");
        }

        //비밀번호 불일치 시
        if(!userPassword.equals(userPasswordCheck)){
            log.info("비번 체크");
            return ResponseDTO.setFailed("password not matched");
        }


        //userEntity 생성 + 회원가입처리
        UserEntity userEntity = new UserEntity(dto);
        //비밀번호 암호화 + 회원가입세팅
        userEntity.setUserEmail(userEmail);
        userEntity.setUserPassword(passwordEncoder.encode(userPassword));
        userEntity.setUserNickname(dto.getUserNickname());
        userEntity.setUserAddress(dto.getUserAddress());
        userEntity.setRole_access(UserRole.USER);
        userEntity.setRole_status(UserRole.ONLINE);

        try {
            log.info("userEntity set : {}", userEntity);
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

        UserEntity userEntity = userRepository.findByUserEmail(userEmail);

        try{
            //이메일 검사
            if(userEntity == null){
                log.info("이메일오류");
                return ResponseDTO.setFailed("Sign In Failed, email diff");
            }
            //비밀번호 검사
            if(!passwordEncoder.matches(userPassword, userEntity.getUserPassword())){
                log.info("페스워드오류");
                return ResponseDTO.setFailed("Sign In Failed, password diff");
            }
        }catch (Exception e){
            return ResponseDTO.setFailed("database error");
        }

        //토큰 생성
        String token = tokenProvider.create(userEmail);
        int exprTime = 3600000;
        log.info("login token : {}", token);

        SignInResponseDTO signInResponseDTO = new SignInResponseDTO(token,exprTime,userEntity);
        return ResponseDTO.setSuccess("signIn success",signInResponseDTO);
    }

    public ResponseDTO<?> signFindEmail(SignFindDTO dto) {
        String email = dto.getUserEmail();
        String userEmailCheck = dto.getUserEmailCheck();
        String userEmailCheckInput = dto.getUserEmailCheckInput();
        log.info(email);
        log.info(userEmailCheck);
        log.info(userEmailCheckInput);

        try {
            if (Objects.equals(userEmailCheck, userEmailCheckInput)) {
                //인증 시 임시번호(랜덤6자리) 발급 후 저장
                String temporaryPassword = mailService.createKey();
                UserEntity user = userRepository.findByUserEmail(email);
                user.setUserPassword(passwordEncoder.encode(temporaryPassword));
                userRepository.save(user);
                return ResponseDTO.setSuccess("find pw complete", temporaryPassword);
            } else {
                return ResponseDTO.setFailed("can not find email");
            }

        } catch (Exception e) {
            return ResponseDTO.setFailed("db error");
        }

    }
}
