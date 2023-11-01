import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useUserStore } from '../../stores';
import { useCookies } from 'react-cookie';

export default function Navigation() {

  const {user, removeUser} = useUserStore();
  const [cookies, setCookies] = useCookies();
  
  //로그아웃 (쿠키도 삭제)
  const logOutHandler = () => {
    setCookies('token', '', {expires: new Date()});
    removeUser();
  }

  return (
    <Box>
          { user ? (
          <IconButton aria-label="delete" color='inherit' onClick={()=> logOutHandler()}>
            <PersonIcon />
          </IconButton>
          ) : (<Button color="inherit">Login</Button>) }
    </Box>
  );
}