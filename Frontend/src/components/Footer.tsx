
import { Box, Typography, IconButton } from '@mui/material';
import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#B1AB86',
        color: 'black',
        textAlign: 'center',
        p: 0.5,
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}>

        <Typography variant='caption' color='black'>Feel free to reach out to us on our social media platforms  </Typography>
        <IconButton><GrInstagram /></IconButton>
        <IconButton><FaFacebook /></IconButton>
        <IconButton><FaSquareXTwitter/></IconButton>
    </Box>
  )
}

export default Footer
