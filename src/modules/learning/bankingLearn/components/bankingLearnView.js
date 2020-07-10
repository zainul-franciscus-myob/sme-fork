import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  Column,
  LearnCallToAction,
  LearnTemplate,
  LearnVideo,
  Row,
} from '../../../../components/LearnTemplate/LearnTemplate';
import imageANZ from '../assets/anz.svg';
import imageASB from '../assets/asb.svg';
import imageBNZ from '../assets/bnz.svg';
import imageCBA from '../assets/cba.svg';
import imageKiwiBank from '../assets/kiwiBank.svg';
import imageNAB from '../assets/nab.svg';
import imageTSB from '../assets/tsb.svg';
import imageWestpac from '../assets/westpac.svg';
import styles from './bankingLearnView.module.css';

const BankingLearnView = ({
  businessId,
  isLoading,
  onClick,
  region,
  serialNumber,
}) => (
  <LearnTemplate title="Make the connection to your bank">
    <Row>
      <Column>
        <h3>Why connect your bank?</h3>

        <p>
          By setting up bank feeds, you can save time by keeping track of all
          your bank accounts in just one place.
        </p>

        <p>
          With a secure connection, you can see daily updates of where your
          money goes and allocate transactions with a click of approval.
          It&apos;s time to get a head start before tax time comes around.
        </p>

        <h3>How to set up a bank feed:</h3>

        <ol>
          <li>Connect your bank or credit card account</li>
          <li>
            You&apos;ll receive a confirmation email once your bank has approved
            the application.
          </li>
          <li>
            View live bank transactions from all your connected bank accounts
            and perform tasks within Essentials such as reconciliation and
            transaction entries.
          </li>
        </ol>

        <LearnCallToAction>
          <ButtonRow
            secondary={[
              <Button
                type="primary"
                key="createBankFeed"
                disabled={isLoading}
                onClick={() => onClick(serialNumber, businessId)}
              >
                Create a bank feed
              </Button>,
            ]}
          />
        </LearnCallToAction>
      </Column>

      <Column>
        <LearnVideo hashedId="8w115lybv7" />
        <div className={styles.logos}>
          {region === 'au' ? (
            <>
              <img src={imageWestpac} alt="Westpac bank" width="80" />
              <img src={imageNAB} alt="NAB bank" width="60" />
              <img src={imageANZ} alt="ANZ bank" width="60" />
              <img src={imageCBA} alt="Commonwealth bank" width="150" />
              <a
                href="https://www.myob.com/au/accounting-software/bankfeeds/feeds"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full list
              </a>
            </>
          ) : (
            <>
              <img src={imageANZ} alt="ANZ bank" width="60" />
              <img src={imageASB} alt="ASB bank" width="50" />
              <img src={imageWestpac} alt="Westpac bank" width="80" />
              <img src={imageBNZ} alt="BNZ bank" width="40" />
              <img src={imageKiwiBank} alt="Kiwi bank" width="30" />
              <img src={imageTSB} alt="TSB bank" width="60" />
              <a
                href="https://www.myob.com/nz/accounting-software/bankfeeds/feeds"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full list
              </a>
            </>
          )}
        </div>
      </Column>
    </Row>
  </LearnTemplate>
);

const mapStateToProps = ({ businessId, isLoading, region, serialNumber }) => ({
  businessId,
  isLoading,
  region,
  serialNumber,
});

export default connect(mapStateToProps)(BankingLearnView);
