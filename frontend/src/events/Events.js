import React, { useEffect, useState } from "react";
import axiosIntance from "../config/axios";
import Main from "../components/Main/index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
const Events = () => {
  const token = useSelector((state) => state.authentication.token);

  const [events, setevents] = useState([]);
  const getevents = () => {
    axiosIntance
      .get("events/", { headers: { Authorization: token } })
      .then((res) => {
        console.log("users" + JSON.stringify(res));
        setevents(res.data);
      });
  };

  const deleteevent = (id) => {
    console.log({ id: id });
    axiosIntance
      .delete(`events/delete/${id}`, { headers: { Authorization: token } })
      .then((res) => {
        console.log({ res });
        getevents();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getevents();
    console.log({ events: events });
  }, []);

  return (
    <Main>
      <div className="container-xxl flex-grow-1 container-p-y">
  <h4 className="fw-bold py-3 mb-4">
    <span className="text-muted fw-light"> Events List  </span> 
  </h4>

      <div className="card" height="200px">
        <h5 className="card-header"> Events </h5>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Type activity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="table-border-bottom-0">
              {events.map((events) => {
                return (
                  <tr>
                    <td>
                      <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                      <strong>{events.title}</strong>
                    </td>
                    <td>{events.describe}</td>

                    <td> {moment(events.start).format("LLLL")}</td>
                    <td> {moment(events.end).format("LLLL")}</td>
                    <td>
                      <span className="badge bg-label-primary me-1">
                        {events.typeActivity}
                      </span>
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
                          <Link
                            to={`showevent/${events._id}`}
                            className="dropdown-item"
                          >
                            <i className="bx bx-edit-alt me-1" /> Edit
                          </Link>

                          <button
                            className="dropdown-item"
                            onClick={() => deleteevent(events._id)}
                          >
                            <i className="bx bx-trash me-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </Main>
  );
};

export default Events;
