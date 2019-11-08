import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getShowDrawer } from '../DrawerSelectors';
import styles from './Drawer.module.css';

const Drawer = ({ showDrawer, children }) => (
  <div className={classNames(styles.drawer, { [styles['drawer--open']]: showDrawer })}>
    {children}
  </div>
);

const mapStateToProps = state => ({
  showDrawer: getShowDrawer(state),
});

export default connect(mapStateToProps)(Drawer);
