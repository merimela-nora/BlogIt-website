import React from 'react'
 import {Link} from 'react-router-dom'
import { AppBar, Toolbar ,Typography,IconButton, Stack,Button } from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';



function Header() {
  return (

    <AppBar position="static" sx={{ backgroundColor: '#B1AB86'}}>
        <Toolbar>
            <Typography variant='h6' color='black' marginRight={'280px'}>
            <IconButton>
                <LibraryBooksIcon sx={{ color: 'black', fontSize: 30 }}/>
            </IconButton> BlogIt
            </Typography>
            
            <Stack direction="row"  spacing={8} justifyContent={'center'}>
          <Button color="inherit" component={Link} to="/"> Home
          </Button>
          <Button color="inherit"  component={Link} to="/login">
            Login
          </Button>
          <Button variant='contained' component={Link} to="/signUp" sx={{ backgroundColor: 'teal'}}>
            Get started
          </Button>
        </Stack>
        </Toolbar>



  </AppBar>
  )
}

export default Header
