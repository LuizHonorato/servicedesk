import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect from='*' to='/' />
    </Router>
)