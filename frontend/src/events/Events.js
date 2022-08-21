import React, { useEffect, useState } from 'react'
import axiosIntance from '../config/axios'
import Main from '../Main/index'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Events = () => {
    const token = useSelector(state => state.authentication.token)

const [events, setevents] = useState([])
    const getevents = () =>{
   
      axiosIntance.get('events/',{ headers: { 'Authorization': token } }).then((res) =>{

            console.log("users"+ JSON.stringify(res));
            setevents(res.data)

            
        })
    }

    const deleteevent=(id) => {
      console.log({id:id});
       axiosIntance.delete(`events/delete/${id}`,{headers: { 'Authorization': token}}).then((res)=>{
        console.log({res});
        getevents()

      }).catch((err)=>{
        console.log({err});
        
      })

    }

    useEffect(() => {
        getevents()
        console.log({events:events});
    },[])
    


  return (
    <Main>
        <div className="container" style={{paddingLeft:"15%"}}>
            
            
            <h1>events </h1>
       



        <table className="table container" style={{paddingLeft:"15%"}}>
  <thead>
    <tr>
      <th scope="col">#title</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">typeActivity</th>

      <th scope="col">describe</th>
      <th scope="col">Handle</th>

    </tr>
  </thead>
  <tbody>
    {events.map((events)=>{

return(
    <tr>
    <th scope="row">{events.title}</th>
    <td>{events.start}</td>
    <td>{events.end}</td>
    <td>{events.typeActivity}</td>
    <td>{events.describe}</td>

    <td><button onClick={()=>deleteevent(events._id)}>delete</button><Link to={`showevent/${events._id}`}>update</Link></td>

  </tr>
)

    })}
   
  
 
  </tbody>
</table>

</div>


    </Main>
  )
}

export default Events