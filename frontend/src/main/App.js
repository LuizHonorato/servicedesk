import React from 'react';
import styled, { cx } from 'react-emotion';

import CssBaseline from '@material-ui/core/CssBaseline';


import Header from '../common/template/Header';
import Navigator from '../common/template/Navigator';
import Content from '../common/template/Content';

const App = styled(({ className }) => (
  <div className={cx('App', className)}>
    <CssBaseline />
    <Navigator />
    <div className={'app-content'}>
      <Header />
      <main className={'main-content'}>
        <Content />
      </main>
    </div>
  </div>
))({
  '&.App': {
    display: 'flex',
    minHeight: '100vh',
  },
  '.navigator': {
    position: 'relative',
  },
  '.app-content': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    main: {
      flex: 1,
    },
    '.main-content': {
      paddingTop: 48,
    },
  },
});

export default App;
