import React, { useState } from 'react';
import { Box } from '@mui/material';
import SignUp from '../Sign/SignUp';
import SignIn from '../Sign/SignIn';

export default function Authentication() {
  const [authView, setAuthView] = useState(false);

  return (
    <div>
      <Box display="flex" height="100vh">
        <Box flex={1} display="flex" justifyContent="center" alignItems="center"></Box>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          {authView ? <SignUp setAuthView={setAuthView} /> : <SignIn setAuthView={setAuthView} />}
        </Box>
      </Box>
    </div>
  );
}
