package com.kkhhae.wheresubway.service;

import com.kkhhae.wheresubway.dto.PatchUserDto;
import com.kkhhae.wheresubway.dto.PatchUserResponseDto;
import com.kkhhae.wheresubway.dto.ResponseDTO;
import com.kkhhae.wheresubway.entity.UserEntity;
import com.kkhhae.wheresubway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ResponseDTO<PatchUserResponseDto> patchUser(PatchUserDto dto, String userEmail){

        UserEntity userEntity = null;
        String userNickname = dto.getUserNickname();
        String userProfile = dto.getUserProfile();

        try {
            userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return ResponseDTO.setFailed("not exist user");
            }
            userEntity.setUserNickname(userNickname);

            userRepository.save(userEntity);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.setFailed("db error");
        }

        //테스트용 이라 주석처리함
//        userEntity.setUserPassword("");

        PatchUserResponseDto patchUserResponseDto = new PatchUserResponseDto(userEntity);
        return ResponseDTO.setSuccess("success", patchUserResponseDto);
    }

}
