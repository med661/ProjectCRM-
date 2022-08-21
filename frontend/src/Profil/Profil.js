import React, { useEffect, useState } from 'react'
import Main from '../Main/index'
import { useSelector,useDispatch } from 'react-redux';
import '../Login/index.css'
import axiosIntance from '../config/axios';
import { setUserInfo } from "../features/authentication/authenticationSlice"
import Swal from 'sweetalert2'

const Profil = () => {
  const userInfo = useSelector(state => state.authentication.userInfo)
  const token = useSelector(state => state.authentication.token)
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setname] =useState(userInfo.name)
  const [mobile, setmobile] =useState(userInfo.mobile)
  const [file, setFile] = useState([]);
  const dispatch=useDispatch()

  const fetchuser=async()=>{
    await  axiosIntance.get('user/profil' , {headers : { 'Authorization' :token }}).then(async(res)=>{
     // console.log({uerinfo:res});   
         dispatch(setUserInfo({user:res.data.message}));
          //console.log({refreshToken :refreshToken});

          //console.log('user info dispatch',JSON.stringify(user));
         /* setUserName(res.data.name)*/
  
         // console.log({userInfo});
  
      }).catch((err)=>{
          console.log('user info',JSON.stringify(err));
      })  
    }  

  useEffect(() => {

    console.log({selectedImage});
  },selectedImage)
  


    const [picture, setPicture] = useState(userInfo.image);
  
    const uploadPicture = (e) => {
      setPicture({
        picturePreview: URL.createObjectURL(e.target.files[0]),
        /* this contains the file we want to send */
        pictureAsFile: e.target.files[0],
      });
    };
  
    const setImageAction = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append("image", picture.pictureAsFile);
      formData.append("name", name);
      formData.append("mobile", mobile);



  
      console.log('image'+picture.pictureAsFile);
  
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
  
      let auth = { headers: { Authorization: token } };
      await axiosIntance.put(`user/${userInfo._id}`,formData,auth).then((response) => {
        console.log({resput:response.data.code});
        if (response.data.code===200) {
          Swal.fire(
            'user updated successfully',
            'now your information updated successfull',
            'success'
          )
          fetchuser();

        }

      }).catch((err)=>{
        console.log({err});
      });

 
    };
  
  return (

    <Main>


  <div className="login_page">
    <h1>update profil</h1>

 
    <br />
  

      <div className="content landing">
      <img alt="not fount" width={"250px"} src={userInfo.image} />

      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />
        <br />
        <br />

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
                <label htmlFor="name">mobile:</label>
                <input type="text" 
                name="name" 
                placeholder="enter your name"
                 id='name'
                  value={mobile}
                  onChange={(e)=>setmobile(e.target.value)}
                />
                <div className="invalid-feedback" style={{ color: 'red' }}>
                 {/*//errName*/}
                </div>

            </div>

            
        <button type="submit" name="upload">
          update
        </button>
      </form>
    </div>





  </div> 

    </Main>
  )
}

export default Profil