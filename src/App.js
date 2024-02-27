import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import UserHomepage from './components/JsFiles/userHomepage';
import AdminHomepage from './components/JsFiles/adminHomepage';
import Profile from './components/JsFiles/Profile';
import UserCrud from './components/JsFiles/Usercrud';
import BookNow from './components/JsFiles/BookNow';
import Screen from './components/JsFiles/screen';
import Seats from './components/JsFiles/seats';
import DateSelection from './components/JsFiles/DateSelection';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    sessionStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
        
          <Route path="/" element={<UserHomepage user={user} />} />

          
          {/* <Route
            path="/admin"
            element={
              user && user.role === 'admin' ? (
                <AdminHomepage user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}

         
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/" />}
          />

         
          <Route
            path="/usercrud"
            element={
              user && user.role === 'admin' ? (
                <UserCrud user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="/book" element={<BookNow />} />
          <Route path="/screen" element={<Screen />} />
          <Route path="/seats" element={<Seats />} />
          <Route path="/dates" element={<DateSelection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
