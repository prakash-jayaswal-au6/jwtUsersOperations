import React, {useEffect, createContext, useReducer, useContext} from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, useHistory,Link } from 'react-router-dom';
import './App.css';


import Login from './components/homescreen/Login';
import Register from './components/homescreen/Register';
import CreateUser from './components/homescreen/CreateUser';
import {reducer, initialState} from './reducer/userReducer'
import Dashboard from './components/homescreen/Dashboard'

export const UserContext = createContext()

const Routing=() =>{
  const history = useHistory()
  const { state,dispatch } = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
      dispatch({type:"USER",payload:user})
    }
    else {
            history.push('/login')  
    }
  },[])
  
  return (
      <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route path='/login'component={Login} />
      <Route path='/register' component={Register}/>
      <Route path='/createuser' component={CreateUser} />
      </Switch>
    
  );
}
function App (){
  const [state,dispatch] = useReducer(reducer,initialState)
  if(state){
    return ( 
      <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Navbar/>
        <Routing />
      </Router>
      </UserContext.Provider>
    )
  } else{
    return(
      <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Routing />
      </Router>
      </UserContext.Provider>
    )
  }
 
}
export default App;
