import React,{useEffect, useState} from 'react'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../config/axios';
import {
  setIsAuth,
  setRefreshToken,
  setUserInfo
} from "../../features/authentication/authenticationSlice";
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
    <nav
  className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
  id="layout-navbar"
>
  <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
    <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
      <i className="bx bx-menu bx-sm" />
    </a>
  </div>
  <div
    className="navbar-nav-right d-flex align-items-center"
    id="navbar-collapse"
  >
    {/* Search */}
    <div className="navbar-nav align-items-center">
      <div className="nav-item d-flex align-items-center">
        <i className="bx bx-search fs-4 lh-0" />
        <input
          type="text"
          className="form-control border-0 shadow-none"
          placeholder="Search..."
          aria-label="Search..."
        />
      </div>
    </div>
    {/* /Search */}
    <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* Place this tag where you want the button to render. */}
         
          {/* User */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img
                  src={user.image}
                  alt=""
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src={user.image}
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">{user.name}</span>
                      <small className="text-muted">{user.role}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/profil">     
                  <i className="bx bx-user me-2" />
                  <span className="align-middle">My Profile</span>
                </Link>
              </li>
            
             
              <li>
                <div className="dropdown-divider" />
              </li>
              <li>
              {isauth?
                <Link className="dropdown-item"  >
                  <i className="bx bx-power-off me-2" />
                  <button className="align-middle"   onClick={handelLogout}>Log Out</button>
                </Link>
                :null }
                

              </li>
            </ul>
          </li>
          {/*/ User */}
        </ul>
  </div>
</nav>

  );
};

export default Navbar;
