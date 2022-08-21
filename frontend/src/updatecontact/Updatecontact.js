import React, { useEffect, useState } from 'react'
import Main from '../Main'
import { useParams } from "react-router"
import { useSelector } from 'react-redux';
import axiosIntance from '../config/axios';
import Swal from 'sweetalert2'


const Updatecontact = () => {
    const params = useParams()
    const id = params.id
    const token = useSelector(state => state.authentication.token)
    const [name, setname] =useState('')
    const [email, setemail] =useState('')
    const [adress, setadress] =useState('')
    const [mobile, setmobile] =useState('')


    const getContact = () =>{
        axiosIntance.get(`contact/getContact/${id}`, { headers: { 'Authorization': token } })
        .then(res =>{
            console.log({res:res.data.message});
            setname(res.data.message.name)
            setemail(res.data.message.email)
            setadress(res.data.message.adress)
            setmobile(res.data.message.mobile)


        }).catch(err => {
          
          console.log(err)})

    }
const handledUpddate=async(e)=>{
    e.preventDefault();
   
  let data = { headers: { 'Authorization': token } }
  await axiosIntance.put(`contact/updateContact/${id}`, {name:name ,mobile:mobile,adress:adress,email:email}, data).then((res) => {

      console.log("put role" + JSON.stringify(res));

      if (res.status==200) {
        Swal.fire(
          'updated contact  changed successfully',
          `now you are  in this platform`,
          'success'
        )
        getContact()


      }
      

  }).catch((err) => {

      //console.log("problem");
    Swal.fire(
      'event added failure',
      'something went wrong',
      'error'
    )
    


  })


}

    useEffect(() => {
        getContact()
    },[])
  return (
    <Main>
        
        <div className="login_page" style={{paddingTop:"50px"}}>
        <h2 className="login">update contact </h2>


        <form onSubmit={handledUpddate} >
           
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

export default Updatecontact