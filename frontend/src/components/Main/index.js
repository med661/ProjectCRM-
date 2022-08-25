
import React from "react";

import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";


export default ({ children }) => {
    return (
        <>
  {/* Layout wrapper */}
  <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      {/* Menu */}
      <Sidebar/>
      {/* / Menu */}
      {/* Layout container */}
      <div className="layout-page">
        {/* Navbar */}
        <Navbar/>
        {/* / Navbar */}
        {/* Content wrapper */}
        {children}
        {/* Content wrapper */}
      </div>
      {/* / Layout page */}
    </div>
    {/* Overlay */}
    <div className="layout-overlay layout-menu-toggle" />
  </div>
  {/* / Layout wrapper */}
</>
    )
}