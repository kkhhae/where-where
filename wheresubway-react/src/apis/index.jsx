import axios from "axios";
import React, { useState } from 'react'


//프록시 설정 -> 8080포트와 합치기
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:8080',
//       changeOrigin: true
//     })
//   );
// };



//스프링 : 회원가입
export const signInApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/signIn", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//스프링 : 로그인
export const signUpApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/signUp", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

