import axios from "axios";
import React, { useState } from 'react'


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

export const StationInfoSet = async (data) => {
    const [keyword, setKeyword] = React.useState('');

    try {
        const response = await axios.get("/api/getStationInfo", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}