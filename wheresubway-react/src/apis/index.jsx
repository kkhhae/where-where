import axios from "axios";
import React from 'react'


export const signInApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/signIn", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const signUpApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/signUp", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


//스프링 : 아이디찾기
export const signFindIdApi = async (data) => {
    console.log("SignFindId 요청 아이디찾기");
    try {
        const response = await axios.post("http://localhost:4000/api/auth/signFindId", data);
        return response.data;
    } catch (error) {
        // console.error(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }

}


//네이버 이메일 인증
export const EmailAccess = async(data) => {
    console.log("Email인증요청!", data);
    try {
        const response = await axios.post("http://localhost:4000/api/emailAccess", data);
        alert("인증번호 전송!");
        return response.data;
    } catch (error) {
        // console.error(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}