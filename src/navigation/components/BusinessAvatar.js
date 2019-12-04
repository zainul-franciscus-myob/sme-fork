import { connect } from 'react-redux';
import React from 'react';

import { getBusinessAbbreviation } from '../NavigationSelectors';
import styles from './BusinessAvatar.module.css';

const BusinessAvatar = ({ abbr }) => (
  <div className={styles.avatar}>{abbr}</div>
);

const mapStateToProps = state => ({
  abbr: getBusinessAbbreviation(state),
});

export default connect(mapStateToProps)(BusinessAvatar);
