import './App.css'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Blogs from './Components/Blogs'
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import Register from './Components/Register'
import CreateBlog from './Components/CreateBlog'
// import Form from './Components/Form'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/CreateBlog' element={<CreateBlog />} />
        <Route path='/About' element={<About />} />
        <Route path='/Blogs' element={<Blogs />} />
      </Routes>
    </>
  )
}

export default App
