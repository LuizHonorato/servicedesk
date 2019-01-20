import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { Grid } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    banner: {
        marginTop: theme.spacing.unit * 8
    },
    image: {
        position: 'relative',
        height: 120,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &$focusVisible': {
          zIndex: 1,
          '& $imageBackdrop': {
            opacity: 0.15,
          },
          '& $imageMarked': {
            opacity: 0,
          },
          '& $imageTitle': {
            border: '4px solid currentColor',
          },
        },
      },
      focusVisible: {},
      imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      },
      imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      },
      imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      },
      imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
      },
      imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      }
})

const images = [
    {
        url: require('../images/livros.jpg'),
        title: 'Clique aqui e entenda como funciona',
        width: '100%'
    }
]

const Banner = ({classes}) => {
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} className={classes.banner}>
                <img src={require('../images/grafismos_sicoob.png')} alt="Grafos" />
            </Grid>
            <Grid item xs={12}>
                <Typography component="h1" variant="h2" gutterBottom>
                    Entre e conheça nossos serviços!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    Aqui você encontrará:
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography component="h1" variant="overline">
                    <p>- Abertura de chamados</p>
                    <p>- Acompanhamento de solicitações</p>
                    <p>- Canal para contato com a TI</p>
                </Typography>
            </Grid>
            <Grid item xs={5}>
                {images.map(image => (
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: image.width,
                        }}
                        >
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}>
                                {image.title}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}
            </Grid>
        </Grid>
    )
}

Banner.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Banner);