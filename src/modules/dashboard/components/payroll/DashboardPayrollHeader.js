import { connect } from 'react-redux';
import React from 'react';

import { getDashboardHeader } from '../../selectors/DashboardSelectors';
import styles from './DashboardPayrollHeader.module.css';

const Greeting = ({ greeting, businessName }) => (
  <div className={styles.greetings}>
    <div className={styles.text}>
      <h1>
        {greeting}
        <br />
        {businessName}
      </h1>
    </div>
  </div>
);

const DashboardPayrollHeader = ({
  greeting,
  businessName,
}) => (
  <div className={styles.header}>
    <div />
    <Greeting
      greeting={greeting}
      businessName={businessName}
    />
    <div />
  </div>
);

const mapStateToProps = state => getDashboardHeader(state);

export default connect(mapStateToProps)(DashboardPayrollHeader);
