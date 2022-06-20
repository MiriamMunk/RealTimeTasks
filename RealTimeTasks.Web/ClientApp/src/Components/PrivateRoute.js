import React from 'react';
import Login from '../Pages/LogIn';
import { Route } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const PrivateRoute = ({ component, ...options }) => {
    const { user } = useUserContext();
    const finalComponent = !!user ? component : Login;
    return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;