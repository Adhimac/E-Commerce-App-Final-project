import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/LoginPage'
import ResetPasssword from './pages/ResetPasssword'


function App() {


  return (
   <>
   <Router>
  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<CreateAccount/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/reset' element={<ResetPasssword/>}/>
     
    </Routes>
   </Router>
   </>
  )
}

export default App
