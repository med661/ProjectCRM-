import React ,{useEffect,useState}from 'react'
import Main from '../Main/index'
import axiosIntance from '../config/axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const ListeContact = () => {
    const token = useSelector(state => state.authentication.token)
    const [users, setusers] = useState([])


    const getusers = () =>{
        axiosIntance.get('contact/contactListe', { headers: { 'Authorization': token } }).then((res) =>{

            console.log("contact"+ JSON.stringify(res));
            setusers(res.data.message)
        })
    }

  const  deleteContact=(id)=>{
    console.log({idcontact:id});
       
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

        await axiosIntance.delete('contact/delete/'+id,auth).then((res) => {
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
      console.log("zaaa");
        getusers()
     
    },[])
    
  return (
    <Main> 
        <h1 style={{paddingLeft:"40%"}}>Contact list</h1>
<table className="table container" style={{paddingLeft:"40%"}}>
  <thead>
    <tr>
      <th scope="col">name</th>
      <th scope="col">mobile</th>
      <th scope="col">email</th>
      <th scope="col">adress</th>

      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {users.map((item)=>{

return(
    <tr>
    <th scope="row">{item.name}</th>
    <td>{item.mobile}</td>
    <td>{item.email}</td>
    <td>{item.adress}</td>

    <td><Link  to={`updatecontact/${item._id}`} className="nav-link">change</Link> <button onClick={()=>deleteContact(item._id)}>delete</button></td>

  </tr>
)

    })}
   
  
 
  </tbody>
</table>


    </Main>
  )
}

export default ListeContact