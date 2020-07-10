import { connect } from 'react-redux';
import React from 'react';

import { getDashboardHeader } from '../selectors/DashboardSelectors';
import BankFeedBalance from './BankFeedBalance';
import headerImage from './top-right-corner-illustration.svg';
import styles from './DashboardHeader.module.css';

const Greeting = ({ greeting, businessName, inspirationalQuote }) => (
  <div className={styles.greetings}>
    <div className={styles.text}>
      <h1>
        {greeting}
        <br />
        {businessName}
      </h1>
    </div>
    <div className={styles.text}>{inspirationalQuote}</div>
  </div>
);

const BankFeedBalanceAndImage = ({ showBankFeedBalance }) => (
  <div className={styles.card}>
    {showBankFeedBalance && <BankFeedBalance />}
    <div className={styles.bankFeedImage}>
      <img src={headerImage} alt="" />
    </div>
  </div>
);

const DashboardHeader = ({
  greeting,
  businessName,
  inspirationalQuote,
  showBankFeedBalance,
}) => (
  <div className={styles.header}>
    <Greeting
      greeting={greeting}
      businessName={businessName}
      inspirationalQuote={inspirationalQuote}
    />
    <BankFeedBalanceAndImage showBankFeedBalance={showBankFeedBalance} />
  </div>
);

const mapStateToProps = (state) => getDashboardHeader(state);

export default connect(mapStateToProps)(DashboardHeader);
