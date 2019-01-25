import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import withStyles from '@material-ui/core/styles/withStyles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

// ICONS
import Exit from '@material-ui/icons/ExitToApp';

import {logout} from '../../auth/authActions'

const styles = () => ({
  grow: {
    flexGrow: 1,
  },
  secondaryAppBar: {
    top: 0,
    zIndex: 1140
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#01ad9d'
    },
    secondary: {
      main: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
})

class Header extends Component {

  render(){
    const {classes} = this.props

    return (
      <React.Fragment>
          <MuiThemeProvider theme={theme}>
            <AppBar
                className={classes.secondaryAppBar}
                color={'primary'}
                position={'sticky'}
                elevation={0}>
                <Toolbar>
                  <Grid container spacing={16} justify={'flex-end'} alignItems={'center'}>
                    <Grid item>
                      <Exit color={'secondary'} onClick={this.props.logout} />
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <AppBar
              className={'third-app-bar'}
              color={'primary'}
              position={'static'}
              elevation={0}>
              <Toolbar>
                <Typography color={'secondary'} variant={'h5'} className={classes.grow}>
                  Chamados
                </Typography>
              </Toolbar>
            </AppBar>
            <AppBar
              className={'fourth-app-bar'}
              color={'primary'}
              position={'static'}
              elevation={0}>
              <Tabs value={0} textColor={'secondary'}>
                <Tab textColor={'secondary'} label="Novo" />
              </Tabs>
            </AppBar>
          </MuiThemeProvider>
    </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)
export default withStyles(styles)(connect(null, mapDispatchToProps)(Header));
