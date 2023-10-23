import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (

    <div id="login-container">
      <div id="loginBox">
        <div id="loginBoxTitle">어디?어디! 회원가입</div>
        <hr class="divider" />
        <div id="inputBox">
          <Box>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="이름"
                  autoFocus>
                </TextField>

                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일주소"
                  name="email"
                  autoComplete="email"
                />

                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />

          </Box>
          <hr class="divider" />
          <div class="button-login-box" >
              <button type="button" class="btn btn-primary btn-xs" style="width:100%;">회원가입</button>
          </div>
          <p>
              <a class="nav-link" onClick={()=> SignUp()}>계정이 이미 있으신가요? 로그인 👉</a>
          </p>
        </div>
      </div>
    </div>
  );
}