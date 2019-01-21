import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import Routes from './main/routes'
import reducers from './main/reducers'

// THEME
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';

// App
import App from './main/App';

// CSS
// import 'sanitize.css/sanitize.css';
// import 'index.css';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <Routes />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};

// Render once
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./main/App', () => {
    render(App);
  });
}
