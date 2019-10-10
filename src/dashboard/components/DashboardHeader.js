import { Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDashboardHeader } from '../selectors/DashboardSelectors';
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
    <div className={styles.text}>
      {inspirationalQuote}
    </div>
  </div>
);

const BankFeedBalanceAndImage = ({ bankFeedBalance }) => {
  const balance = bankFeedBalance
    ? (
      <h1>{bankFeedBalance}</h1>
    )
    : <Icons.CloudDisconnected />;

  return (
    <div className={styles.card}>
      <div className={styles.bankFeed}>
        <h2>
          Current bank feed balance
        </h2>
        {balance}
      </div>
      <div className={styles.bankFeedImage}>
        <img src={headerImage} alt="" />
      </div>
    </div>
  );
};

const DashboardHeader = ({
  greeting,
  businessName,
  inspirationalQuote,
  bankFeedBalance,
}) => (
  <div className={styles.header}>
    <Greeting
      greeting={greeting}
      businessName={businessName}
      inspirationalQuote={inspirationalQuote}
    />
    <BankFeedBalanceAndImage bankFeedBalance={bankFeedBalance} />
  </div>
);

const mapStateToProps = state => getDashboardHeader(state);

export default connect(mapStateToProps)(DashboardHeader);
