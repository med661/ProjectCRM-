import React from 'react'
import './index.css'
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div><div class="area"></div><nav class="main-menu">
    <ul>
        <li>
        <Link  to="/Users" >                 <i class="fa fa-home fa-2x"></i>
                <span class="nav-text">
                 Users
                </span>
                </Link>          
        </li>
        <li class="has-subnav">
        <Link  to="/listecontact" >               
                <i class="fa fa-laptop fa-2x"></i>
                <span class="nav-text">
                    contact list
                </span>
                </Link>          
            
        </li>
        <li class="has-subnav">
        <Link  to="/addContact" >               

               <i class="fa fa-list fa-2x"></i>
                <span class="nav-text">
                    Forms
                </span>
            </Link>          

            
        </li>
        <li class="has-subnav">
        <Link  to="/addEvent" >               
               <i class="fa fa-folder-open fa-2x"></i>
                <span class="nav-text">
                    ADDEVENT
                </span>
            </Link>

           
        </li>
        <li>
        <Link  to="/events" >               
                <i class="fa fa-bar-chart-o fa-2x"></i>
                <span class="nav-text">
                    events
                </span>
                </Link>
        </li>
        <li>
        <Link  to="/profil" >               
                <i class="fa fa-font fa-2x"></i>
                <span class="nav-text">
                   Quotes
                </span>
            </Link>
        </li>
        <li>
           <a href="#">
               <i class="fa fa-table fa-2x"></i>
                <span class="nav-text">
                    Tables
                </span>
            </a>
        </li>
        <li>
           <a href="#">
                <i class="fa fa-map-marker fa-2x"></i>
                <span class="nav-text">
                    Maps
                </span>
            </a>
        </li>
        <li>
            <a href="#">
               <i class="fa fa-info fa-2x"></i>
                <span class="nav-text">
                    Documentation
                </span>
            </a>
        </li>
    </ul>

    <ul class="logout">
        <li>
           <a href="#">
                 <i class="fa fa-power-off fa-2x"></i>
                <span class="nav-text">
                    Logout
                </span>
            </a>
        </li>  
    </ul>
</nav></div>
  )
}

export default Sidebar