import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Layout from './Layout';
import HomePage from './Pages/Home';
import LogIn from './Pages/LogIn';
import Logout from './Pages/LogOut';
import SignUp from './Pages/SignUp';
import { UserContextComponent } from './UserContext';

export default class App extends Component {
    render() {
        return (
            <UserContextComponent>
                <Layout>
                    <PrivateRoute exact path='/' component={HomePage} />
                    <Route exact path='/signUp' component={SignUp} />
                    <Route exact path='/login' component={LogIn} />
                    <Route exact path='/logout' component={Logout} />

                </Layout>
            </UserContextComponent>
        );
    }
}