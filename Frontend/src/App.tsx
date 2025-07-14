import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PublicLayout from './layout/PublicLayout'
import UserLayout from './layout/UserLayout'

import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Blogs from './pages/Blogs'
import NotFound from './pages/NotFound'

import UserPage from './pages/UserPage'
import NewBlog from './pages/NewBlog'
import Profile from './pages/Profile'
import BlogDetails from './pages/BlogDetails'
import EditBlog from './pages/EditBlog'

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            
          </Route>

          
          <Route element={<UserLayout />}>
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogsDetails/:id" element={<BlogDetails />} />
            <Route path="/newBlog" element={<NewBlog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editBlog/:id" element={<EditBlog />} />
          </Route>

          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
