import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import Signup from './components/pages/Signup'
import Signin from './components/pages/Signin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>  
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </BrowserRouter>
    
  );
}

export default App;
