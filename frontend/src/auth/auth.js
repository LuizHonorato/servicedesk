import React from 'react';
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
})

const Auth = ({classes, dispatch}) => {
    
    let email
    let password

    return (
        <form>

        </form>
    )

}

Auth.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect()(Auth));
