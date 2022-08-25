import React, { useState } from "react";
import Main from "../components/Main/index";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosIntance from "../config/axios";

import { isEmail, IsEmpty, isLength, isMatch } from "../validation/validation";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

const AddContact = () => {
  const token = useSelector((state) => state.authentication.token);
  const options = ["Contact", "Client","prospect"];
  const HandelRegister = (e) => {
    e.preventDefault();
    //if (!isMatch(password, cf_password)) return setError('password is not matched')
    let auth = { headers: { Authorization: token } };

    axiosIntance
      .post(
        "contact/addContact",
        {
          name: name,
          email: email,
          mobile: mobile,
          adress: adress,
          company: company,
          status: status,
        },
        auth
      )
      .then((res) => {
        console.log({ register: res });
        if (res.data.code === 201) {
          Swal.fire("user added successfully", "now you can login", "success");
        }
      })
      .catch((err) => {
        //console.log({errregister:err});

        if (err.response.data.message.email) {
          Swal.fire(
            err.response.data.message.email,
            "something went wrong",
            "error"
          );
        }
      });
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [adress, setadress] = useState("");
  const [company, setcompany] = useState("");
  const [mobile, setmobile] = useState("");
  const [status, setstatus] = useState("");
  const [Error, setError] = useState(null);

  const formData = new FormData();
 
  formData.append("name", name);
  formData.append("email", email);
  formData.append("adress", adress);
  formData.append("mobile", mobile);
  formData.append("status", status);
  formData.append("company", company);

  for (var key of formData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  useEffect(() => {});
  return (
    <Main>
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">Add contact </h4>
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Add contact</h5>
              {/* <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
               
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
                 
                  />
                </label>
               
                <p className="text-muted mb-0">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div> */}
            </div>
            <div className="card-body">
              <form onSubmit={HandelRegister}>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span
                        id="basic-icon-default-fullname2"
                        className="input-group-text"
                      >
                        <i className="bx bx-user" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        placeholder="First name"
                        aria-label="First name"
                        aria-describedby="basic-icon-default-fullname2"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-icon-default-company"
                  >
                    Company
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span
                        id="basic-icon-default-company2"
                        className="input-group-text"
                      >
                        <i className="bx bx-buildings" />
                      </span>
                      <input
                        type="text"
                        id="basic-icon-default-company"
                        className="form-control"
                        placeholder="Company"
                        aria-label="Company"
                        aria-describedby="basic-icon-default-company2"
                        required
                        value={company}
                        onChange={(e) => setcompany(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-icon-default-email"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">
                        <i className="bx bx-envelope" />
                      </span>
                      <input
                        type="text"
                        id="basic-icon-default-email"
                        className="form-control"
                        placeholder="xxxxx.xxxx.xx"
                        aria-label="john.doe"
                        aria-describedby="basic-icon-default-email2"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 form-label"
                    htmlFor="basic-icon-default-phone"
                  >
                    Phone
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span
                        id="basic-icon-default-phone2"
                        className="input-group-text"
                      >
                        <i className="bx bx-phone" />
                      </span>
                      <input
                        type="text"
                        id="basic-icon-default-phone"
                        className="form-control phone-mask"
                        placeholder="658 799 8941"
                        aria-label="658 799 8941"
                        aria-describedby="basic-icon-default-phone2"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 form-label"
                    htmlFor="basic-icon-default-phone"
                  >
                    Adress
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span
                        id="basic-icon-default-phone2"
                        className="input-group-text"
                      >
                        <i className="bx bx-map" />
                      </span>
                      <input
                        type="text"
                        id="basic-icon-default-phone"
                        className="form-control phone-mask"
                        placeholder="adress"
                        aria-label="adress"
                        aria-describedby="basic-icon-default-phone2"
                        value={adress}
                        onChange={(e) => setadress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 form-label"
                    htmlFor="basic-icon-default-phone"
                  >
                    Status
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span
                        id="basic-icon-default-phone2"
                        className="input-group-text"
                      >
                        <i className="bx bx-user-circle" />
                      </span>
                      <select
                        id="sendNotification"
                        class="form-select"
                        name="sendNotification"
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                        defaultValue={null}
                        required
                      >
                        {" "}
                        <option onChange={(e) => setstatus(null)}>
                          {" "}
                          {null}{" "}
                        </option>
                        {options.map((item, i) => {
                          return <option>{item}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AddContact;
