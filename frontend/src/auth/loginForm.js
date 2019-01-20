import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles';

import {signin} from './authActions'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    display: 'flex',
    height: 500,
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  welcome: {
    marginTop: theme.spacing.unit * 3
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00635a'
    }
  },
  typography: {
    useNextVariants: true
  }
})

const LoginForm = ({classes, dispatch}) => {

        let email
        let password

        return (
            <main className={classes.main}>
              <Paper className={classes.paper}>
                  <img src={require('../common/images/marcaHome.png')} className={classes.firebaseLogo} alt="Logo" />
                <Typography component="h1" variant="h5" className={classes.welcome}>
                  Seja bem-vindo
                </Typography>
                <form className={classes.form}
                    onSubmit={e => {
                        e.preventDefault()
                        if(!email.value.trim() || !password.value.trim()) {
                            return
                        }
                        dispatch(signin(email.value, password.value))
                        email.value = ''
                        password.value = ''
                    }}>
                  
                    <TextField 
                        inputRef={node => email = node}
                        type='email'
                        id="email"
                        label="E-mail"
                        margin="normal"
                        variant='outlined' 
                        fullWidth />
                  
                  
                    <TextField 
                        inputRef={node => password = node}
                        type='password'
                        id="password"
                        label="Senha"
                        margin="normal"
                        variant='outlined' 
                        fullWidth />
                  <MuiThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Entrar
                    </Button>
                  </MuiThemeProvider>
                </form>
              </Paper>
            </main>
          );
    

}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(LoginForm));