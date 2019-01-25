import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Link} from 'react-router'

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
import LiveHelp from '@material-ui/icons/LiveHelp'
import Home from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';
import Public from '@material-ui/icons/Public';
import Notification from '@material-ui/icons/NotificationImportant'
import Report from '@material-ui/icons/BarChart'
import Widgets from '@material-ui/icons/Widgets' 
import Send from '@material-ui/icons/Send'
import GroupWork from '@material-ui/icons/GroupWork'
 

// STYLES
import withNavigatorStyles from './Navigator.style';

const categories = [
  {
    id: 'Serviços',
    children: [
      { id: 'Novo', icon: <Queue /> },
      { id: 'Meus chamados', icon: <LibraryBooks /> },
      { id: 'Não atendidos', icon: <Notification /> },
      { id: 'Relatórios', icon: <Report /> }
    ],
  },
  {
    id: 'Configurações',
    children: [
      { id: 'Minha conta', icon: <Person /> },
      { id: 'Atributos', icon: <Widgets /> },
      { id: 'Usuários', icon: <People /> },
      { id: 'Opções de e-mail', icon: <Email /> },
      { id: 'Mensagens automáticas', icon: <Send /> },
      { id: 'Cooperativas', icon: <GroupWork /> }
    ]
  },
  {
    id: 'Ajuda',
    children: [
      { id: 'Localização', icon: <Public /> },
      { id: 'Perguntas Frequentes', icon: <LiveHelp /> }
    ],
  }
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
      <Link to="/dashboard" className={classes.link}>
        <ListItem className={cx(classes.header, classes.unPaddedRight, classes.activeItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <Home />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.itemText }}>
            Página Inicial
          </ListItemText>
        </ListItem>
      </Link>
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
          {children.map(({ id: childId, icon, active, path }) => (
            <Link to={path} key={childId} className={classes.link}>
              <ListItem
                button
                dense
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
            </Link>
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
