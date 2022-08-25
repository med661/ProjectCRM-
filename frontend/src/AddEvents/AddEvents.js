import React, { useEffect, useState } from "react";
import Main from "../components/Main/index";
import { useSelector } from "react-redux";
import axiosIntance from "../config/axios";
/* const token = useSelector(state => state.authentication.token)*/
import Swal from "sweetalert2";

const AddEvents = () => {
  const options = ["meeting", "task", "note"];
  const token = useSelector((state) => state.authentication.token);

  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");

  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [typeActivity, settypeActivity] = useState("");

  const onSubmitEvent = (e) => {
    e.preventDefault();
    let auth = { headers: { Authorization: token } };
    axiosIntance
      .post(
        "events/",
        {
          title: title,
          describe: describe,
          start: startdate,
          end: enddate,
          typeActivity: typeActivity,
        },
        auth
      )
      .then((res) => {
        if (res.status == 200) {
          Swal.fire(
            "event added successfully",
            "now you are registered you can login",
            "success"
          );
        }
        console.log("res addevent" + JSON.stringify(res));
      })
      .catch((err) => {
        Swal.fire("event added failure", "try", "error");

        console.log("err add event" + JSON.stringify(err));
      });
  };

  useEffect(() => {
    console.log({ title, describe, startdate });
  }, [title]);

  return (
    <Main>
  
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">Add event </h4>
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Add Event</h5>
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
                        placeholder="First name"
                        aria-label="First name"
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
                    describe
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
                        placeholder="describe"
                        aria-label="describe"
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
                        <i className="bx bx-calendar" />
                      </span>
                      <input
                        type="datetime-local"
                        id="basic-icon-default-date"
                        className="form-control"
                        placeholder="xx/xx/xxxx"
                        aria-label="xx/xx/xxxx"
                        aria-describedby="basic-icon-default-date"
                        value={startdate}
                        onChange={(e) => setStartdate(e.target.value)}
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
                        <i className="bx bx-calendar" />
                      </span>
                      <input
                        type="datetime-local"
                        id="basic-icon-default-date"
                        className="form-control date"
                        placeholder="658 799 8941"
                        aria-label="658 799 8941"
                        aria-describedby="basic-icon-default-enddate"
                        value={enddate}
                        onChange={(e) => setEnddate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 form-label"
                    htmlFor="basic-icon-default-phone"
                  >
                    Type Activity
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span
                        id="basic-icon-default-phone2"
                        className="input-group-text"
                      >
                        <i className="bx bx-map" />
                      </span>
                      <select id="sendNotification" class="form-select"
                       name="sendNotification"
                       value={typeActivity}
                        onChange={(e) => settypeActivity(e.target.value)}
                        defaultValue={null}
                        required
                       >    <option onChange={(e) => settypeActivity(null)}> {null} </option>
                       {options.map((item, i) => {
                         return <option>{item}</option>;
                       })}

                            </select>
                      {/* <input
                        type="text"
                        id="basic-icon-default-phone"
                        className="form-control phone-mask"
                        aria-describedby="basic-icon-default-phone2"
                        value={typeActivity}
                        onChange={(e) => settypeActivity(e.target.value)}
                      /> */}
                    </div>
                  </div>
                </div>
                {/* <div className="row mb-3">
                  <label
                    className="col-sm-2 form-label"
                    htmlFor="basic-icon-default-phone"
                  >
                    Type Activity
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
                        aria-describedby="basic-icon-default-phone2"
                        value={typeActivity}
                        onChange={(e) => settypeActivity(e.target.value)}
                      />
                    </div>
                  </div>
                </div> */}

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

export default AddEvents;
