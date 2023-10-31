import axios from "axios";


//스프링 : 회원가입
export const signInApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/signIn", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//스프링 : 로그인
export const signUpApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/signUp", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

