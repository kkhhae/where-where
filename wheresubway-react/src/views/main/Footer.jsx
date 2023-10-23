import * as React from 'react';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box> 
      <footer className="py-5 bg-black">
        <div className="container px-5">
          <p className="m-0 text-center text-white small">Copyright &copy; 어디어디, 2023</p>
        </div>
      </footer>
    </Box>
  );
}

export default Footer;
