import React, { useEffect, useState } from "react";
import Main from "../Main/index";
import { useSelector } from 'react-redux';
import axiosIntance from "../config/axios";
   /* const token = useSelector(state => state.authentication.token)*/
import Swal from 'sweetalert2'

const AddEvents = () => {

  const options = [
    "meeting",
    "task",
    "note",
  
  ];
  const token = useSelector(state => state.authentication.token)


const [title, setTitle] = useState('')
const [describe, setDescribe] = useState('')

const [startdate, setStartdate] = useState('')
const [enddate, setEnddate] = useState('')
const [typeActivity, settypeActivity] = useState('')


const onSubmitEvent=(e) => {
  e.preventDefault();
  let auth = { headers: { Authorization: token } };
  axiosIntance.post('events/',{title:title,describe:describe,start:startdate,end:enddate,typeActivity:typeActivity},auth)
  .then((res)=>{
    if (res.status==200) {
      Swal.fire(
        'event added successfully',
        'now you are registered you can login',
        'success'
      )
      
    }
    console.log("res addevent"+JSON.stringify(res));
    
  }).catch((err)=>{
    Swal.fire(
      'event added failure',
      'try',
      'error'
    )
    
    console.log('err add event'+JSON.stringify(err));
  })



}



  useEffect(() =>{
    console.log({title,describe,startdate});

  },[title])

  return (
    <Main>

      
      <div className="container" style={{ paddingLeft: "15%" }}>
        <form onSubmit={onSubmitEvent}>
        
   <div className="mb-3 row">
    <label for="title" className="col-sm-2 col-form-label">title</label>
    <div className="col-sm-10">
      <input type="text"  className="form-control" id="title" 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
    </div>
  </div>
  <div className="mb-3 row">
    <label for="describe" className="col-sm-2 col-form-label">describe</label>
    <div className="col-sm-10">
      <textarea type="text" className="form-control" id="describe" rows="4" cols="50" style={{resize: "none"}}
     value={describe}
      onChange={(e)=>setDescribe(e.target.value)}

/>

    </div>
  </div>

  <div className="mb-3 row">
    <label for="startdate" className="col-sm-2 col-form-label">startdate</label>
    <div className="col-sm-10">
    <input className="form-control" type="datetime-local" name="datetime"  id="startdate"
     value={startdate}
     onChange={(e)=>setStartdate(e.target.value)}
    />
    </div>
  </div>
  <div className="mb-3 row">
    <label for="enddate" className="col-sm-2 col-form-label">startdate</label>
    <div className="col-sm-10">
    <input className="form-control" type="datetime-local" name="datetime"  id="enddate"
     value={enddate}
     onChange={(e)=>setEnddate(e.target.value)}
    />
    </div>
  </div>

  <div className="mb-3 row">
    <label for="typeActivity" className="col-sm-2 col-form-label">typeActivity</label>
    <div className="col-sm-10">
    <select className="form-select" aria-label="Default select example" 
     value={typeActivity}
     onChange={(e) => settypeActivity(e.target.value)}
     defaultValue={null}
     required
    id="typeActivity">
    <option onChange={(e) => settypeActivity(null)}> {null} </option>
                {options.map((item, i) => {
                  return <option>{item}</option>;
                })}
</select>

    </div>
  </div>



  <br />
            <div  >
                <button className="login_button" style={{ width: "100%" }} type="submit" >register</button>
            </div>


  </form>
      </div>
    </Main>
  );
};

export default AddEvents;
