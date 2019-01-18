import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

import {logout} from '../auth/authActions'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  button: {
      margin: theme.spacing.unit,
    }
})

class App extends Component {

    render() {
      const {classes} = this.props
      return (
        <div>
          <h1>Home do Service Desk!</h1>
          <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={this.props.logout}>
              Sair
          </Button>
      </div>
      )
    }

}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)
export default withStyles(styles)(connect(null, mapDispatchToProps)(App));