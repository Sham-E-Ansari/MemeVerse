import React, {useEffect, createContext, useReducer,useContext} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Route,Switch, useHistory} from 'react-router-dom'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import Signup from './components/pages/Signup'
import Signin from './components/pages/Signin'
import CreatePost from './components/pages/Createpost'
import {initialState, reducer} from './reducer/userReducer'


export const userContext = createContext()
const Routing= ()=>{
  const history = useHistory()
  const {sate,dispatch} = useContext(userContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
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
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <userContext.Provider value = {{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>  
  );
}

export default App;
