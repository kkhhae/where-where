import * as React from 'react';
import {TextField } from '@mui/material'

import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { signFindIdApi } from '../../Apis';
import { EmailAccess } from '../../Apis';

import signInCss from "../sign.module.css";
import { MainNav } from '../../App';



export default function SignFindId(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userEmailCheck, setUserEmailCheck] = useState('');
    const [userEmailCheckInput, setUserEmailCheckInput] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [cookies, setCookies] = useCookies(); //쿠키

    const naviGate = MainNav(); //네비
    

    //이메일 인증
    const emailSender = async () => {
        const data = {
            userEmail
        }
        const signFindCheckResponse= await EmailAccess(data);


        if (!signFindCheckResponse) {
            alert('실패! 다시 시도하세요');
            return;
        }

        if (!signFindCheckResponse.result) {
            alert('실패! 다시 시도하세요');
            return;
        }

        const datalog = signFindCheckResponse.data;
        setUserEmailCheck(datalog);
        console.log(datalog);
    }

    //비밀번호찾기
    const signFindHandler = async () => {

        if (userEmail.length === 0) {
            alert('이메일을 입력하세요!');
            return;
        }

        if (userEmailCheckInput.length === 0) {
            alert('이메일인증번호를 입력하세요!');
            return;
        }
        const data = {
            userEmail,
            userEmailCheck,
            userEmailCheckInput
        };

        const signFindResponse = await signFindIdApi(data);
        console.log(signFindResponse)

        if (!signFindResponse) {
            alert('실패! 다시 시도하세요');
            return;
        }

        if (!signFindResponse.result) {
            alert('실패! 다시 시도하세요');
            return;
        }

        const datalog = signFindResponse.data;

        alert('임시 비밀번호 발급 >  [ ' + datalog + ' ]  < 입니다.')
        //혹시모를 새로고침(안하고 navi로 바로해도됨)
        return  naviGate('/api/auth/signIn');
    };


    return (
        <div id={signInCss["login-container"]}>

            <div id={signInCss["loginBox"]}>
                <div id="loginBoxTitle">어디?어디 비밀번호찾기</div>
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
                </div>
                <button type="button" className="btn btn-primary btn-xs" onClick={emailSender} style={{width:"100%"}} >이메일인증</button>
                <br/>
                <TextField
                    fullWidth
                    label="이메일 인증번호"
                    type="name"
                    variant="standard"
                    onChange={(e)=> setUserEmailCheckInput(e.target.value)}
                />
                <br/>
                        
                <hr className="divider" />
                <div className="button-login-box" >
                <button type="button" className="btn btn-primary btn-xs" onClick={signFindHandler} style={{width:"100%"}}>비밀번호찾기</button>

                </div>
                
                <br/>
                <p >
                    <a className="nav-link" onClick={()=> naviGate('/api/auth/signUp')}>계정이 없으신가요? 회원가입 👉</a>
                    <a className="nav-link" onClick={()=> naviGate('/api/auth/signIn')}>기억났어요! 로그인하러가기 👉</a>
                </p>

            </div>

        </div>


    </div>

    );
}
