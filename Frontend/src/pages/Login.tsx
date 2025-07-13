import React from 'react'
import { Box , Paper, TextField, Stack, Button, Typography } from '@mui/material'

function Login() {
  return (
    <Box component={'section'}
    sx={{
       marginTop: '5rem',
       marginBottom: '9rem',
       marginLeft: '40px',
       marginRight: '20px',
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'center',
      p: 4,
      position: 'relative',
      bottom: 20,
      width: '90%',
    }}>
      
    <form>
    <Paper sx={{
      marginBottom: '2rem',
      backgroundColor: 'beige'
    }}>
      <Typography variant='h6' textAlign={'center'} color='inherit'>
      Welcome back to BlogIt
      </Typography>
      
      </Paper>
      <Stack>
      <TextField label='Username/Email' required  type='text/email'/>
      <TextField label='password' required type='password'/>
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
  href="/blogs"
>
  Login 
</Button>

      </Stack>
    </form>
    <Typography variant='h6'> No account?<a href="/login">Create one </a>  </Typography>


   </Box>
  )
}

export default Login


