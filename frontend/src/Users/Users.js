import React ,{useEffect,useState}from 'react'
import axiosIntance from '../config/axios'
import Main from '../Main/index'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Users = () => {
    const token = useSelector(state => state.authentication.token)
    const [users, setusers] = useState([])
 



    const getusers = () =>{
        axiosIntance.get('user/getalluser', { headers: { 'Authorization': token } }).then((res) =>{

            console.log("users"+ JSON.stringify(res));
            setusers(res.data)
        })
    }

    const deleteUser=(id)=>{
      console.log({iduserdeleted:id});
     
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        console.log({result});
        if (result.isConfirmed) {
          let auth = { headers: { Authorization: token } };
  
   await  axiosIntance.delete(`user/delete/${id}`,auth).then((res) =>{
            console.log({deletRes:res});
            getusers()
            
  
          }).catch((err) => {
              console.log({errDELETE:err});
          })
  
  
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
     
     
    

      }
   
  
    useEffect(() => {
      
        getusers()
     
    })
    


  return (
    <Main>
<table className="table container" style={{paddingLeft:"15%"}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {users.map((item)=>{

return(
    <tr>
    <th scope="row">{item.name}</th>
    <td>{item.role}</td>
    <td>{item.mobile}</td>
    <td>{item.email}</td>
    <td><Link  to={`updateUser/${item._id}`} className="nav-link">change</Link> 
    <button onClick={()=>deleteUser(item._id)} >delete user</button>

</td>

  </tr>
)

    })}
   
  
 
  </tbody>
</table>


    </Main>
  )
}

export default Users