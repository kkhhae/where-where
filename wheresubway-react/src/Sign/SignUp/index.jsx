import {useState} from 'react';
import TextField from '@mui/material/TextField';

import signInCss from "../sign.module.css";

import { MainNav } from '../../App';
import { signUpApi } from '../../Apis';

    


export default function SignUp() {
    const naviGate = MainNav();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userAddressDetail, setUserAddressDetail] = useState('');


    //유효성 검사
    const validateEmail = (userEmail) => {
      return userEmail
        .toLowerCase()
        .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    };
    const validatePwd = (userPassword) => {
      return userPassword
        .toLowerCase()
        .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
    }
    const validateNickname = (nickname) => {
    return nickname
      .toLowerCase()
      .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/)
    }
    //비밀번호 확인
    const onChangeConfirmPwd = ((userPasswordCheck) => {
      setUserPassword(userPasswordCheck);

      if (userPassword !== userPasswordCheck) {
        alert("비밀번호가 일치하지 않습니다.")
      }
    }, [userPassword])





    //실행
    const signUpHandler =  async () => {

    validateEmail(userEmail);
    validatePwd(userPassword);   
    validateNickname(userNickname);
    onChangeConfirmPwd(userPasswordCheck);
      

        const data = {
          userEmail,
          userPassword,
          userPasswordCheck,
          userNickname,
          userAddress,
          userAddressDetail
        }

        console.log(data);
        //controller 연결(백엔드)
        const signUpResponse = await signUpApi(data);
        console.log(signUpResponse);

        if(!signUpResponse) {
          alert('회원가입 실패! 다시 시도해주세요');
          return;
        }
      
        if(!signUpResponse.result){
            alert('회원가입 실패! 다시 시도해주세요');
            return;
        }
        alert('회원 가입 성공!');
        return naviGate('/api/auth/login');
      };

  return (

    <div id={signInCss["login-container"]}>

            <div id={signInCss["loginBox"]}>
                <div id="loginBoxTitle">어디?어디 회원가입</div>
                <hr className="divider" />

                <div id="inputBox">

                <TextField
                  required
                  fullWidth
                  id="userEmail"
                  label="이메일주소"
                  name="userEmail"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <div className="button-login-box" >
                    <button type="button" className="btn btn-primary btn-xs" style={{width:"100%"}}
                    // onClick={(e) => onCheckEmail(userEmail)}>
                      >이메일 중복체크</button>
                </div>
                <br/>
                <TextField
                  name="userNickname"
                  required
                  fullWidth
                  id="userNickname"
                  label="닉네임"
                  onChange={(e) => setUserNickname(e.target.value)}
                />
                <br/>
                <TextField
                  required
                  fullWidth
                  id="userPassword"
                  label="비밀번호"
                  type="password"
                  name="userPassword"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <br/>
                <TextField
                  required
                  fullWidth
                  name="userPasswordCheck"
                  label="비밀번호 확인"
                  type="password"
                  id="userPasswordCheck"
                  onChange={(e) => setUserPasswordCheck(e.target.value)}
                />
                <br/><br/>
                <TextField
                  fullWidth
                  name="userAddress"
                  label="도로명 주소"
                  id="userAddress"
                  onChange={(e) => setUserAddress(e.target.value)}
                />
                 <br/>
                <TextField
                  fullWidth
                  name="userAddressDetail"
                  label="상세 주소"
                  id="userAddressDetail"
                  onChange={(e) => setUserAddressDetail(e.target.value)}
                />


          <hr className="divider" />
          <div className="button-login-box" >
              <button type="button" className="btn btn-primary btn-xs" style={{width:"100%"}}
              onClick={signUpHandler}>회원가입</button>
          </div>
          <p>
              <a className="nav-link" onClick={()=> naviGate('/api/auth/signIn')}>계정이 이미 있으신가요? 로그인 👉</a>
          </p>


        </div>
      </div>
    </div>

  );
}