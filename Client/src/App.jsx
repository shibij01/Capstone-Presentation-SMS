import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import PropTypes from 'prop-types'
import Home from '../component/Home'
import Portfolio from '../component/Portfolio'
import Weddings from '../component/Weddings'
import About from '../component/About'
import Inquire from '../component/Inquire'
import SamplePage from '../component/SamplePage'
import Navigation from '../component/Navigation'
import Footer from '../component/Footer'
import Services from '../component/Services'
import Editorials from '../component/Editorials'
import Login from '../component/Login'
import { AdminProvider } from './context/AdminContext'


function App( {children} ) {

  App.propTypes = {
    children: PropTypes.node.isRequired
  }

  return (
    <>
    <AdminProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
    <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/portfolio' element={<Portfolio />} /> 
            <Route path='/weddings' element={<Weddings />} /> 
            <Route path='/about' element={<About />} />           
            <Route path='/inquire' element={<Inquire />} />
            <Route path='/services' element={<Services />} />
            <Route path='/editorials' element={<Editorials />} />
            <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AdminProvider>
    </>
  )
}

export default App
