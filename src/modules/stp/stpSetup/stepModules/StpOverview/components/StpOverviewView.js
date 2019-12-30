import {
  Button, ButtonRow, Card, PageHead,
} from '@myob/myob-widgets';
import React from 'react';

import LinkButton from '../../../../../../components/Button/LinkButton';
import bankImage from './bank.svg';
import peopleImage from './people.svg';
import styles from './stpOverview.module.css';

const StpOverviewView = ({ onGetStartedClick }) => {
  const cardHeader = (
    <>
      <PageHead title="Overview" />
      <div className={styles.pageSubHeader}>
        These steps must be completed individually by each person processing payroll, from their
        own account.
      </div>
    </>
  );

  return (
    <div>
      <Card header={<Card.Header child={cardHeader} />}>
        <h1 className={styles.heading}>What you&apos;ll be doing</h1>
        <div className={styles.imageAndText}>
          <img src={bankImage} className={styles.image} alt="bank" />
          <div>
            <h1 className={styles.heading}>If you&apos;re part of the business</h1>
            <ul>
              <li>Grab your ABN</li>
              <li>
                You&apos;ll be entering your business&apos; ABN and contact details, then
                contacting the ATO
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.imageAndText}>
          <img src={peopleImage} className={styles.image} alt="people" />
          <div>
            <h1 className={styles.heading}>If you&apos;re a tax or BAS agent</h1>
            <p>
              These steps must be completed individually by each person processing payroll, from
              their own account.
            </p>
            <ul>
              <li>Grab the business&apos; ABN, as well as your own ABN and RAN</li>
              <li>
                You&apos;ll be connecting to multiple ATO systems, so have all your sign on details
                handy
              </li>
            </ul>
            <div>
              By clicking
              <strong> Get started </strong>
              you acknowledge that you have read and agree to the
              <LinkButton
                isOpenInNewTab
                href="https://www.myob.com/au/support/customer-service/myob-legal-notices/myob-single-touch-payroll-terms-of-use"
                className={styles.termsOfUseLink}
              >
                Terms of Use
              </LinkButton>
               for Single Touch Payroll.
            </div>
          </div>
        </div>
      </Card>
      <ButtonRow
        primary={[<Button onClick={onGetStartedClick} key="get-started-button">Get Started</Button>]}
      />
    </div>
  );
};

export default StpOverviewView;
