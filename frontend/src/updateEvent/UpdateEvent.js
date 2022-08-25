import React, { useState, useEffect } from "react";
import axiosIntance from "../config/axios";
import { useParams } from "react-router";
import { Link,useHistory } from "react-router-dom";
import axios from '../config/axios';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuth,
  setRefreshToken,
  setUserInfo,
} from "../features/authentication/authenticationSlice";


const updateEvent = () => {
  const options = ["meeting", "task", "note"];
  const params = useParams();
  const id = params.id;
  const token = useSelector((state) => state.authentication.token);
  const userInfo = useSelector(state => state.authentication.userInfo)
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");

  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState("");
  const [typeActivity, settypeActivity] = useState("");

  const isauth = useSelector((state) => state.authentication.isauth);
  const user = useSelector((state) => state.authentication.userInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  const getevent = async () => {
    let data = { headers: { Authorization: token } };
    await axiosIntance.get(`events/show/${id}`, data).then((res) => {
      //console.log({res});
      setTitle(res.data.title);
      setDescribe(res.data.describe);

      const date = new Date(res.data.start);
      const datef = new Date(res.data.end);

      console.log(date.toISOString().toString());

      setStartdate(date.toISOString().toString());
      setEnddate(datef.toISOString().toString());
      settypeActivity(res.data.typeActivity);

      //console.log({startdate:startdate});
    });
  };

  const handelLogout = async () => {
    await axios
      .get("user/logout")
      .then((res) => {
        dispatch(setIsAuth({ value: false }));
        dispatch(setRefreshToken({ setRefreshToken: "" }));
        dispatch(setUserInfo({ user: {} }));

        history.push("/login");

        console.log({ isauth });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  function handleChangef(ev) {
    if (!ev.target["validity"].valid) return;
    const dt = ev.target["value"] + ":00Z";
    setEnddate(dt);
  }

  function handleChanges(ev) {
    if (!ev.target["validity"].valid) return;
    const dt = ev.target["value"] + ":00Z";
    setStartdate(dt);
  }

  const onSubmitEvent = async (e) => {
    e.preventDefault();

    await axiosIntance
      .put(
        `events/update/${id}`,
        {
          title: title,
          describe: describe,
          start: startdate,
          end: enddate,
          typeActivity: typeActivity,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log("put event" + JSON.stringify(res));

        if (res.status == 200) {
          Swal.fire(
            "updated event  changed successfully",
            `|`,
            "success"
          );
          getevent();
        }
      })
      .catch((err) => {
        //console.log("problem");
        Swal.fire("event added failure", "something went wrong", "error");
      });
  };
  useEffect(() => {
    getevent();
  }, []);

  return (
    //     <Main>
    //       <div className="container" style={{ paddingLeft: "15%" }}>
    //     <form onSubmit={onSubmitEvent}>

    // <div className="mb-3 row">
    // <label for="title" className="col-sm-2 col-form-label">title</label>
    // <div className="col-sm-10">
    //   <input type="text"  className="form-control" id="title"
    //   value={title}
    //   onChange={(e)=>setTitle(e.target.value)}
    //   />
    // </div>
    // </div>
    // <div className="mb-3 row">
    // <label for="describe" className="col-sm-2 col-form-label">describe</label>
    // <div className="col-sm-10">
    //   <textarea type="text" className="form-control" id="describe" rows="4" cols="50" style={{resize: "none"}}
    //  value={describe}
    //   onChange={(e)=>setDescribe(e.target.value)}

    // />

    // </div>
    // </div>

    // <div className="mb-3 row">
    // <label for="startdate" className="col-sm-2 col-form-label">startdate</label>
    // <div className="col-sm-10">
    // <input className="form-control" type="datetime-local" name="datetime"  id="startdate"
    //  //value={startdate}
    // // defaultValue={startdate}
    //  //onChange={(e)=>setStartdate(e.target.value)}
    //  value={(startdate || '').toString().substring(0, 16)}

    //  onChange={handleChanges}

    // />
    // </div>
    // </div>
    // <div className="mb-3 row">
    // <label for="enddate" className="col-sm-2 col-form-label">startdate</label>
    // <div className="col-sm-10">
    // <input className="form-control" type="datetime-local" name="datetime"  id="enddate"
    //  //value={enddate}

    //  value={(enddate || '').toString().substring(0, 16)}
    //  onChange={handleChangef}
    // // onChange={(e)=>setEnddate(e.target.value)}
    // />
    // </div>
    // </div>

    // <div className="mb-3 row">
    // <label for="typeActivity" className="col-sm-2 col-form-label">typeActivity</label>
    // <div className="col-sm-10">
    // <select className="form-select" aria-label="Default select example"
    //  value={typeActivity}
    //  onChange={(e) => settypeActivity(e.target.value)}
    //  defaultValue={null}
    //  required
    // id="typeActivity">
    // <option onChange={(e) => settypeActivity(null)}> {null} </option>
    //             {options.map((item, i) => {
    //               return <option>{item}</option>;
    //             })}
    // </select>

    // </div>
    // </div>

    // <br />
    //         <div  >
    //             <button className="login_button" style={{ width: "100%" }} type="submit" >register</button>
    //         </div>

    // </form>
    //   </div>

    //     </Main>
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
      />
      <title>Upadate Contact</title>
      <meta name="description" content="" />
      {/* Favicon */}
      <link
        rel="icon"
        type="image/x-icon"
        href="../assets/img/favicon/favicon.ico"
      />
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
      />
      {/* Icons. Uncomment required icon fonts */}
      <link rel="stylesheet" href="../assets/vendor/fonts/boxicons.css" />
      {/* Core CSS */}
      <link
        rel="stylesheet"
        href="../assets/vendor/css/core.css"
        className="template-customizer-core-css"
      />
      <link
        rel="stylesheet"
        href="../assets/vendor/css/theme-default.css"
        className="template-customizer-theme-css"
      />
      <link rel="stylesheet" href="../assets/css/demo.css" />
      {/* Vendors CSS */}
      <link
        rel="stylesheet"
        href="../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
      />
      {/* Page CSS */}
      {/* Helpers */}
      {/*! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section */}
      {/*? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  */}
      {/* Layout wrapper */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          {/* Menu */}
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
          >
            <div className="app-brand demo">
              <a href="index.html" className="app-brand-link">
                <span className="app-brand-logo demo">
                  <svg
                    width={25}
                    viewBox="0 0 25 42"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <defs>
                      <path
                        d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                        id="path-1"
                      />
                      <path
                        d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                        id="path-3"
                      />
                      <path
                        d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                        id="path-4"
                      />
                      <path
                        d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                        id="path-5"
                      />
                    </defs>
                    <g
                      id="g-app-brand"
                      stroke="none"
                      strokeWidth={1}
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Brand-Logo"
                        transform="translate(-27.000000, -15.000000)"
                      >
                        <g
                          id="Icon"
                          transform="translate(27.000000, 15.000000)"
                        >
                          <g
                            id="Mask"
                            transform="translate(0.000000, 8.000000)"
                          >
                            <mask id="mask-2" fill="white">
                              <use xlinkHref="#path-1" />
                            </mask>
                            <use fill="#696cff" xlinkHref="#path-1" />
                            <g id="Path-3" mask="url(#mask-2)">
                              <use fill="#696cff" xlinkHref="#path-3" />
                              <use
                                fillOpacity="0.2"
                                fill="#FFFFFF"
                                xlinkHref="#path-3"
                              />
                            </g>
                            <g id="Path-4" mask="url(#mask-2)">
                              <use fill="#696cff" xlinkHref="#path-4" />
                              <use
                                fillOpacity="0.2"
                                fill="#FFFFFF"
                                xlinkHref="#path-4"
                              />
                            </g>
                          </g>
                          <g
                            id="Triangle"
                            transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                          >
                            <use fill="#696cff" xlinkHref="#path-5" />
                            <use
                              fillOpacity="0.2"
                              fill="#FFFFFF"
                              xlinkHref="#path-5"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="app-brand-text demo menu-text fw-bolder ms-2">
                  CRM
                </span>
              </a>
              <a
                href="javascript:void(0);"
                className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
              >
                <i className="bx bx-chevron-left bx-sm align-middle" />
              </a>
            </div>
            <div className="menu-inner-shadow" />
            <ul className="menu-inner py-1">
              {/* Dashboard */}
              <li className="menu-item active">
                <a href="/" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-home-circle" />
                  <div data-i18n="Analytics">Dashboard</div>
                </a>
              </li>
              {/* Layouts */}
              {userInfo.role === "admin" ? (
                <li className="menu-item">
                  <Link to="/users" className="menu-link menu-toggle">
                    <i className="menu-icon tf-icons bx bx-user-circle" />
                    <div data-i18n="Authentications">Liste Users</div>
                  </Link>
                </li>
              ) : null}

              <li className="menu-item">
                <Link to="/addContact" className="menu-link menu-toggle">
                  <i className="menu-icon tf-icons bx bx-dock-top" />
                  <div data-i18n="contact">Add Contact</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/listecontact" className="menu-link menu-toggle">
                  <i className="menu-icon tf-icons bx bx-dock-top" />
                  <div data-i18n="contact">Liste contact</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link to="/addEvent" className="menu-link menu-toggle">
                  <i className="menu-icon tf-icons bx bx-cube-alt" />
                  <div data-i18n="Misc">Add Event</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/events" className="menu-link menu-toggle">
                  <i className="menu-icon tf-icons bx bx-cube-alt" />
                  <div data-i18n="Misc">List Event</div>
                </Link>
              </li>
            </ul>
          </aside>
          {/* / Menu */}
          {/* Layout container */}
          <div className="layout-page">
            {/* Navbar */}
            <nav
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
            >
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a
                  className="nav-item nav-link px-0 me-xl-4"
                  href="javascript:void(0)"
                >
                  <i className="bx bx-menu bx-sm" />
                </a>
              </div>
              <div
                className="navbar-nav-right d-flex align-items-center"
                id="navbar-collapse"
              >
                {/* Search */}
                <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                    <i className="bx bx-search fs-4 lh-0" />
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Search..."
                      aria-label="Search..."
                    />
                  </div>
                </div>
                {/* /Search */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* Place this tag where you want the button to render. */}

                  {/* User */}
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a
                      className="nav-link dropdown-toggle hide-arrow"
                      href="javascript:void(0);"
                      data-bs-toggle="dropdown"
                    >
                      <div className="avatar avatar-online">
                        <img
                          src="../assets/img/avatars/profile.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar avatar-online">
                                <img
                                  src="../assets/img/avatars/profile.png"
                                  alt=""
                                  className="w-px-40 h-auto rounded-circle"
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <span className="fw-semibold d-block">
                                {user.name}
                              </span>
                              <small className="text-muted">{user.role}</small>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profil">
                          <i className="bx bx-user me-2" />
                          <span className="align-middle">My Profile</span>
                        </Link>
                      </li>

                      <li>
                        <div className="dropdown-divider" />
                      </li>
                      <li>
                        {isauth ? (
                          <Link className="dropdown-item">
                            <i className="bx bx-power-off me-2" />
                            <button
                              className="align-middle"
                              onClick={handelLogout}
                            >
                              Log Out
                            </button>
                          </Link>
                        ) : null}
                      </li>
                    </ul>
                  </li>
                  {/*/ User */}
                </ul>
              </div>
            </nav>
            {/* / Navbar */}
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light"></span> Update Event
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}

                  {/* Basic with Icons */}
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">Update Event</h5>
                      </div>
                      <div className="card-body">
                      <form onSubmit={onSubmitEvent}>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-icon-default-fullname"
                            >
                              Title
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
                                  placeholder="Titre"
                                  aria-label="titre"
                                  aria-describedby="basic-icon-default-fullname2"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-icon-default-company"
                            >
                              Description
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
                                  placeholder="company"
                                  aria-label="company"
                                  aria-describedby="basic-icon-default-company2"
                                  value={describe}
                                  onChange={(e) => setDescribe(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-icon-default-email"
                            >
                              Start date
                            </label>
                            <div className="col-sm-10">
                              <div className="input-group input-group-merge">
                                <span className="input-group-text">
                                  <i className="bx bx-envelope" />
                                </span>
                                <input
                                  className="form-control"
                                  aria-label="john.doe"
                                  aria-describedby="basic-icon-default-email2"
                                  type="datetime-local"
                                  name="datetime"
                                  id="startdate"
                                  value={(startdate || "")
                                    .toString()
                                    .substring(0, 16)}
                                  onChange={handleChanges}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 form-label"
                              htmlFor="basic-icon-default-phone"
                            >
                              End date
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
                                  type="datetime-local"
                                  name="datetime"
                                  id="basic-icon-default-calender"
                                  className="form-control phone-mask"
                                  placeholder="658 799 8941"
                                  aria-label="658 799 8941"
                                  aria-describedby="basic-icon-default-phone2"
                                  value={(enddate || "")
                                    .toString()
                                    .substring(0, 16)}
                                  onChange={handleChangef}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label
                              className="col-sm-2 form-label"
                              htmlFor="basic-icon-default-phone"
                            >
                              Type Activity                           </label>
                            <div className="col-sm-10">
                              <div className="input-group input-group-merge">
                                <span
                                  id="basic-icon-default-phone2"
                                  className="input-group-text"
                                >
                                  <i className="bx bx-user-circle" />
                                </span>

                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={typeActivity}
                                  onChange={(e) =>
                                    settypeActivity(e.target.value)
                                  }
                                  defaultValue={null}
                                  required
                                  id="typeActivity"
                                >
                                  class="form-select"
                                  <option
                                    onChange={(e) => settypeActivity(null)}
                                  >
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
              </div>
              {/* / Content */}
              {/* Footer */}
              <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0">
                    © , made with ❤️ by
                    <a
                      href="/"
                      target="_blank"
                      className="footer-link fw-bolder"
                    >
                      CRM-kawther
                    </a>
                  </div>
                </div>
              </footer>
              {/* / Footer */}
              <div className="content-backdrop fade" />
            </div>
            {/* Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>
        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle" />
      </div>
      {/* / Layout wrapper */}

      {/* Core JS */}
      {/* build:js assets/vendor/js/core.js */}
      {/* endbuild */}
      {/* Vendors JS */}
      {/* Main JS */}
      {/* Page JS */}
      {/* Place this tag in your head or just before your close body tag. */}
    </>
  );
};

export default updateEvent;
