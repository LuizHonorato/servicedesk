import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'

import Navigator from '../common/template/navigator'
import {logout} from '../auth/authActions'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class App extends Component {

    render() {
      return (
        <div>
          <Navigator />
        </div>
      )
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)
export default withStyles(styles)(connect(null, mapDispatchToProps)(App));