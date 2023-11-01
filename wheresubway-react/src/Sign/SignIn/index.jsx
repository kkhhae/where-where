import * as React from 'react';
import {TextField } from '@mui/material'

import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { signInApi} from '../../Apis';

import signInCss from "../sign.module.css";
import { MainNav } from '../../App';



export default function SignIn(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [cookies, setCookies] = useCookies(); //쿠키

    const naviGate = MainNav(); //네비



    const signUpHandler = async () => {

        if (userEmail.length === 0 || userPassword.length === 0) {
            alert('이메일, 비밀번호를 입력하세요!');
            return;
        }

        const data = {
            userEmail,
            userPassword,
        };

        const signInResponse = await signInApi(data);

        if (!signInResponse) {
            alert('로그인 실패! 다시 시도하세요');
            return;
        }

        if (!signInResponse.result) {
            alert('로그인 실패! 다시 시도하세요');
            return;
        }

        const { token, exprTime, user } = signInResponse.data;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + exprTime);
        setCookies('token', token, { expires });

        alert('로그인 성공!')
        //혹시모를 새로고침(안하고 navi로 바로해도됨)
        return  window.location.replace("/");
    };


    return (
        <div id={signInCss["login-container"]}>

            <div id={signInCss["loginBox"]}>
                <div id="loginBoxTitle">어디?어디 로그인</div>
                <hr className="divider" />

                <div id="inputBox">

                <div className="input-form-box">
                    <TextField
                        fullWidth
                        label="이메일"
                        type="name"
                        variant="standard"
                        onChange={(e)=> setUserEmail(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="비밀번호"
                        type="password"
                        variant="standard"
                        onChange={(e)=> setUserPassword(e.target.value)}
                    />
                </div>
                        
                <hr className="divider" />
                <div className="button-login-box" >
                <button type="button" className="btn btn-primary btn-xs" onClick={signUpHandler} style={{width:"100%"}}>로그인</button>

                </div>

                <br/>
                <p >
                    <a className="nav-link" onClick={()=> naviGate('/api/auth/signUp')}>계정이 없으신가요? 회원가입 👉</a>
                    <a className="nav-link" onClick={()=> naviGate('/api/auth/signFind')}>비밀번호..가? 비밀번호찾기 👉</a>
                </p>

            </div>

        </div>


    </div>

    );
}
