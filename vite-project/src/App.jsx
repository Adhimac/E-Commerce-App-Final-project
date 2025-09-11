import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

import CreateAccount from './pages/CreateAccount'

function App() {


  return (
   <>
   <Router>
  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<CreateAccount/>} />
    </Routes>
   </Router>
   </>
  )
}

export default App
