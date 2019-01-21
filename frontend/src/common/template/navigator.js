import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// COMPONENTS
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography';

// ICONS
import Queue from '@material-ui/icons/Queue'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import Email from '@material-ui/icons/Email'
import Home from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import Public from '@material-ui/icons/Public';


// STYLES
import withNavigatorStyles from './Navigator.style';

const categories = [
  {
    id: 'Serviços',
    children: [
      { id: 'Novo', icon: <Queue /> },
      { id: 'Meus chamados', icon: <LibraryBooks /> },
      { id: 'Minha conta', icon: <People />, active: true }
    ],
  },
  {
    id: 'Ajuda',
    children: [
      { id: 'Localização', icon: <Public /> },
      { id: 'Contato', icon: <Email /> }
    ],
  },
];

const Navigator = ({ classes }) => (
  <Drawer
    variant="permanent"
    classes={{ paper: cx('navigator', classes.drawer) }}
  >
    <List className={classes.list}>
      <ListItem className={classes.header}>
        <ListItemIcon className={classes.itemIcon}>
          <img src={require('../images/sicoob_logo.png')} alt="Logo" />
        </ListItemIcon>
        <Typography component="h1" variant="h5" className={classes.titleMenu}>
                  Service Desk
        </Typography>
      </ListItem>
      <ListItem className={cx(classes.header, classes.unPaddedRight)}>
        <ListItemIcon className={classes.itemIcon}>
          <Home />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.itemText }}>
          Página Inicial
        </ListItemText>
      </ListItem>
      {categories.map(({ id, children }) => (
        <React.Fragment key={id}>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderText,
              }}
            >
              {id}
            </ListItemText>
          </ListItem>
          {children.map(({ id: childId, icon, active }) => (
            <ListItem
              button
              dense
              key={childId}
              className={cx(classes.item, active && classes.activeItem)}
            >
              <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemText,
                  textDense: classes.textDense,
                }}
              >
                {childId}
              </ListItemText>
            </ListItem>
          ))}
          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </List>
  </Drawer>
);

Navigator.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withNavigatorStyles(Navigator);
