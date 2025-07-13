import React from 'react'
import{Box, Paper, TextField, Stack, Button, Typography} from '@mui/material'

function SignUp() {
  return (
    <Box
    sx={{
       marginTop: '2rem',
       marginBottom: '9rem',
       marginLeft: '40px',
       marginRight: '2rem',
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
      Join BlogIt
      </Typography>
      
      </Paper>
      <Stack>
      <TextField label='first name'  required type='text'/>
      <TextField label='last name'  required type='text'/>
      <TextField label='username' required type='text'/>
      <TextField label='email address' required type='email'/>
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
  Sign In
</Button>

      </Stack>
    </form>
    <Typography variant='h6'> Already have an account?<a href='/login'>Login here</a></Typography>


   </Box>
  )
}

export default SignUp
