import React ,{useState} from 'react'

import './App.css';

import Login from './components/Login/Login';
import PublicRoute from './HOC/PublicRoute';
import PrivateRoute from './HOC/PrivateRoute';
import { selectisauth, selectuser } from './features/authentication/authenticationSlice';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidebar from './components/Layouts/Sidebar';
import Register from './components/Register/Register';
import Users from './Users/Users';
import Profile from './profile/Profile';
import Landing from './components/Landingpage/Landingpage';
import AddContact from './addContact/AddContact';
import ListeContact from './ListeContact/ListeContact';
import AddEvents from './AddEvents/AddEvents';
import Profil from './components/Profil/Profil';
import Events from './events/Events';
import updateUser from './components/updateuser/updateUser';
import Updatecontact from './updatecontact/Updatecontact.js';
import UpdateEvent from './updateEvent/UpdateEvent';


function App() {

  const userInfo = useSelector(state => state.authentication.userInfo)
 // const lol = useSelector(state => state.authentication)
  

//console.log({lol});
  return (
   <div>
      <Router  forceRefresh={true} >
   
        
        <Switch>
          
          <Route exact path="/" component={Landing}/>


          <PrivateRoute path='/profile'  roles={["client",'user','admin']} component={Profile} forcerefresh={true}  />

          <PrivateRoute path='/users'  roles={['admin']} component={Users}  />
          <PrivateRoute path='/addContact'  roles={["client",'user','admin']} component={AddContact}  />
          <PrivateRoute path='/listecontact'  roles={["client",'user','admin']} component={ListeContact}  />
                              {/**public provider */}
          <PrivateRoute path='/profil'  roles={["client",'user','admin']} component={Profil}  />
          <PrivateRoute path='/events'  roles={["client",'user','admin']} component={Events}  />
          <PrivateRoute path='/updateUser/:id'  roles={['admin']} component={updateUser}  />

                     {/**public provider */}
        <PrivateRoute path='/showevent/:id' roles={["client",'user','admin']} component={UpdateEvent} /> 

          <PrivateRoute path='/addEvent' roles={["client",'user','admin']} component={AddEvents} /> 
          <PrivateRoute path='/updatecontact/:id' roles={["client",'user','admin']} component={Updatecontact} /> 

           {/**public provider */}
    
            <PublicRoute restricted={true} path='/login' component={Login} exact />

            <PublicRoute restricted={true} path='/register' component={Register}  forcerefresh={true} />

           

{/**public */}





          
        </Switch>
      </Router>



    </div>
   
  );
}

export default App;
