import * as React from 'react';
import Box from '@mui/material/Box';

import { MainNav } from '../../App';

function Header() {

  const naviGate = MainNav();

  return (
    <Box>
      
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a onClick={() => naviGate('/')} className="navbar-brand">어디?어디!</a>
                 <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><a onClick={() =>naviGate('/map')} className="nav-link" >지도</a></li>
                        <li className="nav-item"><a onClick={() =>naviGate('/api/auth/signIn')} className="nav-link">로그인</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </Box>
  );
}

export default Header;
