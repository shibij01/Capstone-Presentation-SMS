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


function App( {children} ) {

  App.propTypes = {
    children: PropTypes.node.isRequired
  }

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>

    <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path='samplepage' element={<SamplePage />} /> 
            <Route path='/' element={<Home />} /> 
            <Route path='portfolio' element={<Portfolio />} /> 
            <Route path='weddings' element={<Weddings />} /> 
            <Route path='about' element={<About />} />           
            <Route path='inquire' element={<Inquire />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
