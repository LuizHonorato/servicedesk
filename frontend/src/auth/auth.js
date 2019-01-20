import React from 'react';
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';

import Banner from '../common/template/banner'
import LoginForm from './loginForm'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    banner: {
        marginTop: theme.spacing.unit * 8
    },
    services: {
        marginTop: theme.spacing.unit * 3
    }
})

const Auth = ({classes}) => {

    return (
        <div className={classes.root}>
          <Grid container spacing={16}>
              <Grid item xs={8}>
                  <Banner />
              </Grid>
              <Grid item xs={4}> 
                  <LoginForm />
              </Grid>
            </Grid>
        </div>
    )

}

Auth.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Auth);
