import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
 

  return (
   <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Home/>}></Route>
        <Route path='/signup' element = {<Signup/>}> </Route>
        <Route path='/login' element = {<Login/>}> </Route>
        <Route path='/forgotPassword' element = {<ForgotPassword/>}> </Route>
        <Route path='/resetPassword/:token' element = {<ResetPassword/>}> </Route>
        
      </Routes>
   </BrowserRouter>
  )
}

export default App
