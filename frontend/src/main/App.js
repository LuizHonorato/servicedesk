import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigator from '../common/template/navigator'
import Header from '../common/template/header'

const styles = theme => ({
  App: {
    display: 'flex',
    minHeight: '100vh',
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    main: {
      flex: 1
    }
  }
})

const App = ({classes}) => {

  return (
    <div className={classes.App}>
      <CssBaseline />
          <Navigator />
      <div className={classes.appContent}>
        <Header />
      </div>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);