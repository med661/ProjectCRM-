import React ,{useEffect,useState}from 'react'
import Main from '../components/Main/index'
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
        

 <div class="container-xxl flex-grow-1 container-p-y">
 <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span> Contacts List</h4>
              <div className="card">
  <h5 className="card-header">Contact</h5>
  <div className="card-body">
    <div className="table-responsive text-nowrap">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Adress</th>          
            <th>Status</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((item)=>{

return(
          <tr>
            <td>
              <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
              <strong>{item.name}</strong>
            </td>
            <td>{item.mobile}</td>
            <td>
            {item.email}
            </td>
            <td>{item.adress}</td>
          
            <td>
              <span className="badge bg-label-info me-1">{item.status}</span>
            </td>
            <td>
              <span className="badge bg-label-primary me-1">{item.company}</span>
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
                <Link className="dropdown-item" to={`updatecontact/${item._id}`}>
                    <i className="bx bx-edit-alt me-1" /> Edit
                  </Link>

                  
                  <button className="dropdown-item" onClick={()=>deleteContact(item._id)}>
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
</div>

    </Main>
  )
}

export default ListeContact