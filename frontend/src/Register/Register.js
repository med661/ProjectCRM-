import React ,{useState}from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosIntance from '../config/axios';
import "./index.css"
import { isEmail, IsEmpty, isLength, isMatch } from "../validation/validation"
import Swal from 'sweetalert2'

const Register = () => {


    
    const [name, setname] =useState('')
    const [email, setemail] =useState('')
    const [adress, setadress] =useState('')
    const [password, setpassword] =useState('')
    const [cf_password, setcf_password] =useState('')
    const [mobile, setmobile] =useState('')
const [Error, setError] =useState([])
const [erremail, seterremail] =useState()

    const HandelRegister=(e)=>{
        e.preventDefault();
        seterremail(null,)
 if (!isMatch(password, cf_password)) return setError('password is not matched')

axiosIntance.post('user/register',{name:name,email:email,password:password,mobile:mobile,adress}).then((res)=>{
console.log({register:res});
if(res.data.code===201){
    Swal.fire(
        'user added successfully',
        'now you are registered you can login',
        'success'
      )}

}).catch((err)=>{
    seterremail(err.response.data.message.email);
    console.log(erremail);
   
        
        /*Swal.fire(
            `${erremail}`,
            'now you are registered you can login',
            'success'
          )*/
    
    

})

    }




    useEffect(() =>
    {console.log({name,password,cf_password,adress})
        
        console.log({erremail});
        },[])
  return (
    <>


    <div className="login_page">
        <h2 className="login">Register</h2>


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
                <div className="invalid" style={{ color: 'red' }}>
                {erremail}
                </div>

            </div>
            <div>
                <label htmlFor="password">password:</label>
                <input type="password" name="password" placeholder="enter your password" id='password'
                       value={password} onChange={(e)=>setpassword(e.target.value)}
                />
                <div className="invalid" style={{ color: 'red' }}>
                {Error}
                </div>

            </div>
            <div>
                <label htmlFor="cf_password">password:</label>
                <input type="password" name="cf_password" placeholder="comfirm your password" id='cf_password'
               value={cf_password} onChange={(e)=>setcf_password(e.target.value)}
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
                {erremail}

                </div>

            </div>

            <br />
            <div  >
                <button className="login_button" style={{ width: "100%" }} type="submit" >register</button>
            </div>


        </form>
        <br />
        <p style={{ marginTop: '20px' }} >already an account<Link to="login"> login</Link></p>

    </div>


</>

  )
}

export default Register