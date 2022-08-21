import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectisauth, selectuser } from '../features/authentication/authenticationSlice';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const userInfo = useSelector(state => state.authentication.userInfo)
    const isauth = useSelector(state => state.authentication.isauth)
    const isa = useSelector(state => state.authentication)
    //console.log({isa});


    return (
        <Route {...rest} render={props => {
            if (!isauth)
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />

            if (!roles.includes(userInfo.role))
                return <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute;