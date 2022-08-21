import React,{useEffect, useState} from 'react'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from '../config/axios';
import {
  setIsAuth,
  setRefreshToken,
  setUserInfo
} from "../features/authentication/authenticationSlice";
import {NavLink} from 'react-router-dom';


const Navbar = () => {
  const isauth = useSelector(state => state.authentication.isauth)
  const user = useSelector(state => state.authentication.userInfo)
  const token = useSelector(state => state.authentication.token)
const [first, setfirst] = useState(false)
const history = useHistory();
  const dispatch=useDispatch()
  
  console.log("user", user);
  const handelLogout=async()=>{
   await axios.get("user/logout").then((res)=>{
     dispatch(setIsAuth({value:false}))
     dispatch(setRefreshToken({setRefreshToken:""}))
     dispatch(setUserInfo({user:{}}))

     history.push("/login");

     console.log({isauth});

    
    }).catch((err)=>{
        console.log({err});
    })
    
}

const fetchuser=async()=>{
  await  axios.get('user/profil' , {headers : { 'Authorization' :token }}).then(async(res)=>{
       dispatch(setUserInfo({user:res.data.message}));

       
        console.log({user:user});

    }).catch((err)=>{
        console.log('user info',JSON.stringify(err));
    })  
  }  
useEffect(() => {
  fetchuser()
  

  
},[first]);

  return (
    <nav className="navbar navbar-expand-lg bg-light" style={{paddingLeft:"5%"}}>
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Go my code </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
         

          {isauth?<> 
            <li className="nav-item">
           <Link  to="/login" className="nav-link">{user.role}:{user.name}</Link>

          </li>
   
   
         
          </>:<><Link  to="/login" className="nav-link"> 
            Login
          </Link>
          <Link  to="/register" className="nav-link"> 
            Register
       </Link>
          </>}
        </ul>
        {isauth?<span className="navbar-text">
        <button className="nav-link" onClick={handelLogout}>logout</button> 
  </span>:null }
       
      </div>
    </div>
    <NavLink  to="/register" className="nav-link"> 
            Register
       </NavLink>
       <NavLink to="/login" className="navbar-link">login</NavLink>

  </nav>
  )
}

export default Navbar