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



export const signInApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/signIn", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const signUpApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/signUp", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}



// export const StationInfoSet = async (data) => {
//     const [keyword, setKeyword] = React.useState('');

//     try {
//         const response = await axios.get("/api/getStationInfo", data);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }