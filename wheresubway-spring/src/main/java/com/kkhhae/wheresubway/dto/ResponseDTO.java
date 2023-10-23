package com.kkhhae.wheresubway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDTO<D> {
    private boolean result;
    private String message;
    private D data;

    //응답 성공 시
    public static <D> ResponseDTO<D> setSuccess(String message,
                                                D data){
//        return new ResponseDTO<D>(true, message, data);
        return ResponseDTO.set(true,message,data);
    }

    //응답 실패 시
    public static <D> ResponseDTO<D> setFailed(String message){
        return ResponseDTO.set(false, message, null);
    }


    public D getKeyword() {
        return this.data;
    }

}
