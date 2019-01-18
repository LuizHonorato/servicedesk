import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'

import AuthOrApp from './authOrApp'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp} />
        <Redirect from='*' to='/' />
    </Router>
)