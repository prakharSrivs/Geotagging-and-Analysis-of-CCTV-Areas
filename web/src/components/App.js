import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'
import UserPortal from './UserPortal'
import AdditionalDetails from './AdditionalDetails'
import Login from './Login'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={
      <Register/>
    }/>
    <Route path='/adminLogin' element={<AdminLogin/>}/>
    <Route path='/adminRoute' element={<AdminPanel/>}/>
    <Route path='/additionalDetails' element={<AdditionalDetails/>}/>
    <Route path='/userRoute' element={<UserPortal/>}/>
    <Route path='/logIn' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
