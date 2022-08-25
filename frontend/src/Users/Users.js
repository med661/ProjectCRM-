import React ,{useEffect,useState}from 'react'
import axiosIntance from '../config/axios'
import Main from '../components/Main/index'
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
         

<div class="container-xxl flex-grow-1 container-p-y">
 <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span> Users List</h4>

<div className="card">
  <h5 className="card-header">Users</h5>
  <div className="table-responsive text-nowrap">
    <table className="table">
      <thead className="table-light">
        <tr>
          <th>Name User</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Profil</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="table-border-bottom-0">
      {users.map((item)=>{

return(
        <tr>
          <td>
            <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
            <strong>{item.name}</strong>
          </td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          
          <td>
            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
              <li
                data-bs-toggle="tooltip"
                data-popup="tooltip-custom"
                data-bs-placement="top"
                className="avatar avatar-xs pull-up"
                title="Lilian Fuller"
              >
                <img
                  src="../assets/img/avatars/6.png"
                  alt="Avatar"
                  className="rounded-circle"
                />
              </li>
              
             
            </ul>
          </td>
          <td>
              <span className="badge bg-label-success me-1">{item.role}</span>
            </td>
         
          <td>
            <div className="dropdown">
              <button
                type="button"
                className="btn p-0 dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
              >
                <i className="bx bx-dots-vertical-rounded" />
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item"   to={`updateUser/${item._id}`}>
                  <i className="bx bx-edit-alt me-1" /> Edit
                </Link>
                <button className="dropdown-item"  onClick={()=>deleteUser(item._id)}>
                  <i className="bx bx-trash me-1" /> Delete
                </button>
               
              </div>
            </div>
          </td>
        </tr>
       )

      })}
      </tbody>
    </table>
  </div>
</div>
</div>
    </Main>
  )
}

export default Users