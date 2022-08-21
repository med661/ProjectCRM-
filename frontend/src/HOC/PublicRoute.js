import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectisauth, selectuser } from '../features/authentication/authenticationSlice';

function PublicRoute({ component: Component, restricted, ...rest }) {

    const isauth =  useSelector(state => state.authentication.isauth)
    console.log({isauth: isauth});

    return (
        <Route {...rest} render={props => (
            isauth && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    )
}

export default PublicRoute