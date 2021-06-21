import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import SharedPost from './pages/post-page';
import RegisterPage from './pages/register-page';
import LoginPage from './pages/login-page';
import ProfilePage from './pages/profile-page';

const Navigation = () => {
    return (
        <Switch>
            <Route path="/" exact component={ HomePage } />
            <Route path="/share" component={ SharedPost } />
            <Route path="/register" component={ RegisterPage } />
            <Route path="/login" component={ LoginPage } />
            <Route path="/profile" component={ ProfilePage } />
            <Route path="*" component={ HomePage } />
        </Switch>
    );
}

export default Navigation;