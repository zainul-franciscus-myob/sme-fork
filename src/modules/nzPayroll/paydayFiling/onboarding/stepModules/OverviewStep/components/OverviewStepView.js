import { Button, ButtonRow, Card, PageHead } from '@myob/myob-widgets';
import React from 'react';

import bankImage from './images/bank.svg';
import loginImage from './images/login.svg';
import peopleImage from './images/people.svg';
import styles from './OverviewStepView.module.css';

const OverviewStepView = ({ onGetStartedClick }) => {
  const cardHeader = (
    <>
      <PageHead title="Overview" />
      <div className={styles.pageSubHeader}>
        Each time you process a pay, employment information is automatically
        sent from MYOB to Inland Revenue.
      </div>
    </>
  );

  return (
    <div>
      <Card header={<Card.Header child={cardHeader} />}>
        <div className={styles.imageAndText}>
          <img src={peopleImage} className={styles.image} alt="people" />
          <div>
            <h1 className={styles.heading}>
              Should I connect to payday filing?
            </h1>
            <p>
              {' '}
              Each person submitting information to IR must authorise MYOB to
              submit on their behalf.
            </p>
            <p>
              {' '}
              We recommend that the first person to connect to payday filing is
              either:
            </p>
            <ul className={styles.list}>
              <li>the owner of the business&apos;s myIR account</li>
              <li>
                someone who has been uploading files for payroll via ir-File
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.imageAndText}>
          <img src={bankImage} className={styles.image} alt="bank" />
          <div>
            <h1 className={styles.heading}>
              What will I need to get connected?
            </h1>
            <p>Before you start, make sure you have:</p>
            <ul className={styles.list}>
              <li>your business&apos;s IRD number</li>
              <li>your login details for my IR</li>
            </ul>
          </div>
        </div>
        <div className={styles.imageAndText}>
          <img src={loginImage} className={styles.image} alt="login" />
          <div>
            <h1 className={styles.heading}>
              I&apos;ve already connected to payday filing, why am I seeing this
              page again?
            </h1>
            <p>
              {' '}
              MYOB keeps your account connected to payday filing, but
              occasionally your account can be disconnected - kind of like being
              signed out. When this happens, all you have to do is connect
              again.
            </p>
          </div>
        </div>
      </Card>
      <ButtonRow
        primary={[
          <Button testid="getStarted" onClick={onGetStartedClick}>
            Get Started
          </Button>,
        ]}
      />
    </div>
  );
};

export default OverviewStepView;
