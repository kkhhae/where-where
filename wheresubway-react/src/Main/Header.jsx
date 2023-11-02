import React from 'react';
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';

import { MainNav } from '../App';
import Logo from '../Component/whereLogo.png'

function Header() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const naviGate = MainNav();

  const handleLogout = () => {
    alert("로그아웃!")
    // 로그아웃을 처리하고 쿠키에서 토큰을 제거합니다.
    
    removeCookie('token');
    // 여기에서 추가적인 로그아웃 처리를 수행할 수도 있습니다.

    // 페이지 리로딩 또는 다른 로직 수행
    window.location.replace("/")
  };

  return (
    <Box>
      
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <img src={Logo} onClick={() => naviGate('/')} className="navbar-brand" style={{width:'50px', height:'50px'}}/> 
                <a className="nav-link" style={{color:'#fff'}} onClick={() => naviGate('/')}>어디?어디!</a>
                 <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><a onClick={() =>naviGate('/map')} className="nav-link" >지도</a></li>
                        {cookies.token ? (
                          <li className="nav-item"><a onClick={handleLogout} className="nav-link">로그아웃</a></li>
                        ) : (
                          <li className="nav-item"><a onClick={() => naviGate('/api/auth/signIn')} className="nav-link">로그인</a></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    </Box>
  );
}

export default Header;
