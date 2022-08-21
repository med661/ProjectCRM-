import React, { useEffect,useState } from 'react'
import Main from '../Main'
import { useParams } from "react-router"
import axiosIntance from './../config/axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'

const updateUser = () => {
    
  const options = [
    "user",
    "admin",
    "client",
  
  ];
    const params = useParams()
    const id = params.id
    const token = useSelector(state => state.authentication.token)

    console.log(id);
const [user, setuser] = useState({})
const [role, setrole] = useState()

const changerole=async(e)=>{
  e.preventDefault()


  let data = { headers: { 'Authorization': token } }
  await axiosIntance.put(`user/update_role/${user._id}`, {role:role }, data).then((res) => {

      console.log("put role" + JSON.stringify(res));

      if (res.status==200) {
        Swal.fire(
          'role  changed successfully',
          `now you are ${role} in this platform`,
          'success'
        )
        getuser()

      }
      

  }).catch((err) => {
    Swal.fire(
      'event added failure',
      'something went wrong',
      'error'
    )
    


  })
}
    const getuser=()=>{
        axiosIntance.get(`user/getuser/${id}`, { headers: { 'Authorization': token } })
        .then(res =>{
            console.log({res});
            setuser(res.data.message)
            setrole(res.data.message.role)
        }).catch(err => console.log(err))



    }

    useEffect(() => {
      getuser()
    
  
    }, [])

  
    
  return (
    <Main>
        <div className="container">
        <img alt="not fount" width={"250px"} src={user.image} />


           <h3> {user.name}</h3> 
           <h3>{user.email}</h3>  
           <h3>{user.mobile}</h3>  

           <form onSubmit={changerole}>
            
  <div className="mb-3 row">
    <label for="typeActivity" className="col-sm-2 col-form-label">role</label>
    <div className="col-sm-10">
    <select className="form-select" aria-label="Default select example" 
     value={role}
     onChange={(e) => setrole(e.target.value)}
     defaultValue={user.role}
     required
    id="typeActivity">
    <option onChange={(e) => setrole(null)}> {null} </option>
                {options.map((item, i) => {
                  return <option>{item}</option>;
                })}
</select>


    </div>
  </div>
  <div  >
                <button className="login_button" style={{ width: "100%" }} type="submit" >update</button>
            </div>


           </form>



        </div>
        

    </Main>
  )
}

export default updateUser