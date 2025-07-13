
import { Box, Typography, Button } from '@mui/material';


function Landing() {
  return (
    <Box
  sx={{
    height: '57vh',
    backgroundImage: 'linear-gradient(to right, white, white)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 6,
    py: 8,
  }}
>
 
  <Box sx={{ flex: 1, p: 4 }}>
    <Typography variant="h2" color="black" fontFamily="cursive" gutterBottom>
      Welcome to BlogIt
    </Typography>
    <Typography variant="h6" color="black" fontFamily="cursive" gutterBottom>
      A cozy blogging platform where you can share your thoughts and ideas with the world.
    </Typography>
    <Button
      variant="contained"
      sx={{
        mt: 2,
        px: 4,
        py: 1.5,
        fontWeight: 'bold',
        borderRadius: '12px',
        textTransform: 'none',
        backgroundColor: '#819067',
        
      }}
      href="/signUp"
    >
      Get started with us
    </Button>
  </Box>

  
  <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
    <img src="/blog (2).jpg"  style={{ width: '80%', maxHeight: '700px' }} />
  </Box>
</Box>

  );
}
  
export default Landing
