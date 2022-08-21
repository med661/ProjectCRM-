import React ,{useState}from 'react'
import Main from '../Main/index'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosIntance from '../config/axios';
import "../Register/index.css"
import { isEmail, IsEmpty, isLength, isMatch } from "../validation/validation"
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'

const AddContact = () => {
  const token = useSelector(state => state.authentication.token)

  const HandelRegister=(e)=>{
    e.preventDefault();
//if (!isMatch(password, cf_password)) return setError('password is not matched')
let auth = { headers: { Authorization: token } };

axiosIntance.post('contact/addContact',{name:name,email:email,mobile:mobile,adress},auth).then((res)=>{
console.log({register:res});
if(res.data.code===201){
Swal.fire(
    'user added successfully',
    'now you can login',
    'success'
  )}

}).catch((err)=>{
//console.log({errregister:err});


if (err.response.data.message.email) {
  Swal.fire(
    err.response.data.message.email,
    'something went wrong',
    'error'
  )
}
})

}

const [name, setname] =useState('')
const [email, setemail] =useState('')
const [adress, setadress] =useState('')

const [mobile, setmobile] =useState('')
const [Error, setError] =useState(null)



useEffect(() =>{
    
    
    ;})
  return (
    <Main>
       
    <div className="login_page" style={{paddingTop:"50px"}}>
        <h2 className="login">add contact </h2>


        <form onSubmit={HandelRegister} >
           
            <div>
                <label htmlFor="name">name:</label>
                <input type="text" 
                name="name" 
                placeholder="enter your name"
                 id='name'
                  value={name}
                  onChange={(e)=>setname(e.target.value)}
                />
                <div className="invalid-feedback" style={{ color: 'red' }}>
                 {/*//errName*/}
                </div>

            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" placeholder="enter your email" id='email' required
                 value={email} onChange={(e)=>setemail(e.target.value)}

                />
                <div className="invalid-feedback" style={{ color: 'red' }}>
                </div>

            </div>
          
            <div>
                <label htmlFor="mobile">mobile:</label>
                <input type="mobile" name="mobile" placeholder="your number" id='mobile'
                  value={mobile} onChange={(e)=>setmobile(e.target.value)}
              />
                <div className="invalid-feedback" style={{ color: 'red' }}>
                </div>

            </div>
            <div>
                <label htmlFor="email">adress:</label>
                <input type="text" name="email" placeholder="enter your email" id='email' required
                 value={adress} onChange={(e)=>setadress(e.target.value)}

                />
                <div className="invalid-feedback" style={{ color: 'red' }}>
                </div>

            </div>

            <br />
            <div  >
                <button className="login_button" style={{ width: "100%" }} type="submit" >register</button>
            </div>


        </form>
        <br />

    </div>


    </Main>
  )
}

export default AddContact