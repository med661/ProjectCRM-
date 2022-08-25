import React,{useEffect, useState} from 'react'
import Main from '../Main/index'
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import axios from "../../config/axios"
import { setUserInfo } from "../../features/authentication/authenticationSlice"

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Landingpage = () => {
  const [userName, setUserName] = useState("")
  const [role, setrole] = useState(false)
  
    const [value, onChange] = useState(new Date());
 

const token = useSelector(state => state.authentication.token)
const userInfo = useSelector(state => state.authentication.userInfo)
const AUTH = useSelector(state => state.authentication)
const dispatch=useDispatch()
const fetchuser=async()=>{
  await  axios.get('user/profil' , {headers : { 'Authorization' :token }}).then(async(res)=>{
   // console.log({uerinfo:res});   
       dispatch(setUserInfo({user:res.data.message}));
        //console.log({refreshToken :refreshToken});

        //console.log('user info dispatch',JSON.stringify(user));
       /* setUserName(res.data.name)*/
        setrole(true)

       // console.log({userInfo});

    }).catch((err)=>{
        console.log('user info',JSON.stringify(err));
    })  
  }  
  useEffect(() => {
    ///console.log("landing token: "+ token);
// */  setTimeout(() => {
    fetchuser()
    //setrole(false)

  //}, 5000);

   

  
    },[]);
    
  return (
    <Main>
      <div>
     <div className="content-wrapper">
          {/* Content */}
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-lg-12 mb-4 order-0">
                <div className="card">
                  <div className="d-flex align-items-end row">
                    <div className="col-sm-7">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          Welcom {userInfo.firstname}🎉
                        </h5>
                        <p className="mb-4">
                         
                          {userInfo.role === "user"?<p> {userInfo.firstname} you must connect to the admin</p>:null}
                      <h1 style={{paddingLeft:"5%"}}> {userInfo.firstname}</h1>                        </p>
                       
                      </div>
                    </div>
                    <div className="col-sm-5 text-center text-sm-left">
                      <div className="card-body pb-0 px-0 px-md-4">
                        <img
                          src="../assets/img/illustrations/man-with-laptop-light.png"
                          height={140}
                          alt="View Badge User"
                          data-app-dark-img="illustrations/man-with-laptop-dark.png"
                          data-app-light-img="illustrations/man-with-laptop-light.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-4 order-0">
              <div className="card">
              <Calendar onChange={onChange} value={value} />
              </div>
              </div>
            
             
          </div>
          {/* / Content */}
          {/* Footer */}
          <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
              <div className="mb-2 mb-md-0">
                © , made with ❤️ by
                <a
                  href="/"
                  target="_blank"
                  className="footer-link fw-bolder"
                >
                 CRM-kawther
                </a>
              </div>
             
            </div>
          </footer>
          {/* / Footer */}
          <div className="content-backdrop fade" />
        </div>

  
    </div>
    </div>
    </Main>
  )
}

export default Landingpage