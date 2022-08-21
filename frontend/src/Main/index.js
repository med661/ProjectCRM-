
import React from "react";
import Sider from "../Layouts/Sidebar"
export default ({ children }) => {
    return (
        <>

            <div style={{ display: 'flex' }} >

                <Sider />
                <div style={{ width: '100%', padding: '20px' }} >
                    {children}
                </div>


            </div>


        </>
    )
}