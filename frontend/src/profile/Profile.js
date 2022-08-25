import  React, { useEffect,useState } from "react"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import axios from "../config/axios"
import { setUserInfo } from "../features/authentication/authenticationSlice"
import Main from "../components/Main/index"



const Profile = () => {
    const [userName, setUserName] = useState("")
    const [role, setrole] = useState(false)

const token = useSelector(state => state.authentication.token)
 const userInfo = useSelector(state => state.authentication.userInfo)
 const AUTH = useSelector(state => state.authentication)
 //console.log({AUTH});

const dispatch=useDispatch()
//console.log({refreshToken :token});
  //console.log({isauth,token});
  //console.log(userInfo,"hhh");
 /* useEffect(() => {
  console.log({refreshToken:token});
  console.log({refreshToken:token});

  })*/
  
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

      {userInfo.role === "user"?<p>mr/mz {userInfo.name} you must connect to the admin</p>:null}
      <h1 style={{paddingLeft:"5%"}}>mr/mz {userInfo.name}</h1>
    </Main>
  )
}

export default Profile