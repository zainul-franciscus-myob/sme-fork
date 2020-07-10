import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import styles from './Drawer.module.css';

const Drawer = ({ isOpen, children }) => (
  <div
    className={classNames(styles.drawer, { [styles['drawer--open']]: isOpen })}
  >
    {children}
  </div>
);

const mapStateToProps = (state) => ({
  isOpen: state.isOpen,
  drawerView: state.drawerView,
});

export default connect(mapStateToProps)(Drawer);
