import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {signin} from './authActions'

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

const Auth = ({classes, dispatch}) => {
    
    let email
    let password

    return (
        <form className={classes.root}
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
                id="email"
                label="E-mail"
                margin="normal"/>

            <TextField 
                inputRef={node => password = node}
                id="password"
                label="Senha"
                margin="normal"/>

            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Entrar
            </Button>
        </form>
    )

}

Auth.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect()(Auth));
