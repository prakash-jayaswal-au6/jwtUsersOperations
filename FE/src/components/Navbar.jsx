import React,{useContext,useRef,useEffect,useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css'
 
const logo = "https://previews.123rf.com/images/blazerrss/blazerrss2003/blazerrss200300003/143663945-home-logo-vector-design.jpg"
const Navbar = () => {
  const {state, dispatch } = useContext(UserContext)
  const history = useHistory()
 

  const renderList = () => {
    if(state) {
      return [
        <li key="2"><Link to="/createuser">create New User</Link></li>,
        <li key="5">
          <button className='btn waves-effect waves-light logout'
                    onClick={() =>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push("/login")
                    }}> <i className="material-icons">power_settings_new</i></button>
        </li>,
        
      ]
    }
  }

  

    return (
        <nav>
        <div className="nav-wrapper #e8eaf6 indigo lighten-5">
          <Link to={state? "/":"/login"} className="brand-logo left">
            <img className="nav-logo" src={logo}></img>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
    
    
      </nav>
    )
}
export default Navbar;