import logo from './logo.svg';
// import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import UserHomapage from './components/userHomepage';
import AdminHomapage from './components/adminHomepage';
import { ToastContainer } from 'react-toastify';


function App() {

  
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
        <Routes>
        <Route exact path="/" element={<Login/>} />
          <Route exact path="register" element={<Register />}  />
          <Route exact path="user" element={<UserHomapage />}  />
          <Route exact path="admin" element={<AdminHomapage />}  />
            
        
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
