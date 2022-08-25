import React, { useEffect, useState } from 'react'
import Main from '../Main/index'
import { useSelector,useDispatch } from 'react-redux';

import axiosIntance from '../../config/axios';
import { setUserInfo } from "../../features/authentication/authenticationSlice"
import Swal from 'sweetalert2'

const Profil = () => {
  const userInfo = useSelector(state => state.authentication.userInfo)
  const token = useSelector(state => state.authentication.token)
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstname, setFirstname] =useState(userInfo.firstname)
  const [lastname, setLastname] =useState(userInfo.lastname)
  const [email, setEmail] =useState(userInfo.email)
  const [organization, setOranization]=  useState(userInfo.organization)
  const [adress, setAdress]= useState(userInfo.adress)
  const [mobile, setMobile] =useState(userInfo.mobile)
  const [state, setState] =useState(userInfo.state)
  const[zipcode, setZipCode]=useState(userInfo.zipcode)
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
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("adress", adress);
      formData.append("mobile", mobile);
      formData.append("state", state);
      formData.append("zipcode", zipcode);
      formData.append("organization", organization);


  
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

<div className="content-wrapper">
  {/* Content */}
  <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="fw-bold py-3 mb-4">
      <span className="text-muted fw-light">Account Settings /</span> Account
    </h4>
    <div className="row">
      <div className="col-md-12">
        <ul className="nav nav-pills flex-column flex-md-row mb-3">
          <li className="nav-item">
            <a className="nav-link active" href="javascript:void(0);">
              <i className="bx bx-user me-1" /> Account
            </a>
          </li>
         
         
        </ul>
        <div className="card mb-4">
          <h5 className="card-header">Profile Details</h5>
          {/* Account */}
          <div className="card-body">
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src={userInfo.image}
                alt="user-avatar"
                className="d-block rounded"
                height={100}
                width={100}
                id="uploadedAvatar"
              />
              <div className="button-wrapper">
                <label
                  htmlFor="upload"
                  className="btn btn-primary me-2 mb-4"
                  tabIndex={0}
                >
                  <span className="d-none d-sm-block">Upload new photo</span>
                  <i className="bx bx-upload d-block d-sm-none" />
                  <input
                    type="file"
                    id="upload"
                    className="account-file-input"
                    name="image" 
                    onChange={uploadPicture}
                  />
                </label>
               
                <p className="text-muted mb-0">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="card-body">
            <form
              id="formAccountSettings"
              method="POST"
              onSubmit={setImageAction}
            >
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="firstName"
                    value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="organization" className="form-label">
                    Organization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="organization"
                    name="organization"
                    value={organization}
                    onChange={(e)=>setOranization(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">TUN (+216)</span>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      value={mobile}
                      onChange={(e)=>setMobile(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={adress}
                    onChange={(e)=>setAdress
                      (e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Tunisie"
                    value={state}
                    onChange={(e)=>setState(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="zipCode" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    placeholder={231465}
                    maxLength={6}
                    value={zipcode}
                    onChange={(e)=>setZipCode(e.target.value)}
                  />
                </div>
                
               
                
             
              </div>
              <div className="mt-2">
                <button type="submit" className="btn btn-primary me-2">
                  Save changes
                </button>
                <button type="reset" className="btn btn-outline-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
          {/* /Account */}
        </div>
       
      </div>
    </div>
  </div>
</div>

  

    </Main>
  )
}

export default Profil
