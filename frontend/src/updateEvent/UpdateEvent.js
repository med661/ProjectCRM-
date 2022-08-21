import React, { useState ,useEffect} from 'react'
import Main from '../Main'
import { useSelector } from 'react-redux';
import axiosIntance from "../config/axios";
import { useParams } from "react-router"

const updateEvent = () => {
    
  const options = [
    "meeting",
    "task",
    "note",
  
  ];
  const params = useParams()
  const id = params.id
  const token = useSelector(state => state.authentication.token)


const [title, setTitle] = useState('')
const [describe, setDescribe] = useState('')

const [startdate, setStartdate] = useState(null)
const [enddate, setEnddate] = useState('')
const [typeActivity, settypeActivity] = useState('')


const getevent = async() =>{
    
    let data = { headers: { 'Authorization': token } }
    await axiosIntance.get(`events/show/${id}`, data).then((res) => {
        //console.log({res});
        setTitle(res.data.title)
        setDescribe(res.data.describe)

    const date = new Date(res.data.start);
    const datef = new Date(res.data.end);

    console.log(date.toISOString().toString());
   
   setStartdate(date.toISOString().toString())
    setEnddate(datef.toISOString().toString())
    settypeActivity(res.data.typeActivity)

//console.log({startdate:startdate});
   
        
    })
}

function handleChangef(ev) {
    if (!ev.target['validity'].valid) return;
    const dt= ev.target['value'] + ':00Z';
    setEnddate(dt);
  }

  function handleChanges(ev) {
    if (!ev.target['validity'].valid) return;
    const dt= ev.target['value'] + ':00Z';
    setStartdate(dt);
  }


    const onSubmitEvent=async (e)=>{
        e.preventDefault();

        await axiosIntance.put(`events/update/${id}`,{title:title,describe:describe,start:startdate,end:enddate,typeActivity:typeActivity}, { headers: { 'Authorization': token } }).then((res)=>{
            console.log({res});
        }).catch(err=> console.log({err}))


    }
    useEffect(() => {
        getevent()
    }, [])
  
  return (
    <Main> <div className="container" style={{ paddingLeft: "15%" }}>
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
 //value={startdate}
// defaultValue={startdate}
 //onChange={(e)=>setStartdate(e.target.value)}
 value={(startdate || '').toString().substring(0, 16)}

 onChange={handleChanges}


/>
</div>
</div>
<div className="mb-3 row">
<label for="enddate" className="col-sm-2 col-form-label">startdate</label>
<div className="col-sm-10">
<input className="form-control" type="datetime-local" name="datetime"  id="enddate"
 //value={enddate}

 value={(enddate || '').toString().substring(0, 16)}
 onChange={handleChangef}
// onChange={(e)=>setEnddate(e.target.value)}
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
  )
}

export default updateEvent