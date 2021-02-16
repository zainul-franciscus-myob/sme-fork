import { Alert, Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  Column,
  LearnCallToAction,
  LearnTemplate,
  Row,
} from '../../../components/LearnTemplate/LearnTemplate';
import {
  getLoadingState,
  getMoveToMYOBUrl,
  getSerialNumber,
} from '../MoveToMYOBSelectors';
import PageView from '../../../components/PageView/PageView';
import moveToMYOB from './MoveToMYOB.svg';
import styles from './MoveToMYOB.module.css';

const MoveToMYOBView = ({
  moveToMYOBUrl,
  onGetStartedClick,
  serialNumber,
  loadingState,
}) => {
  const view = (
    <LearnTemplate title="Move your data from Xero, Quickbooks desktop or Reckon desktop">
      <Row>
        <Column>
          <h3>Right now it&apos;s our shout</h3>

          <p>
            Import transactions, accounts, invoices and more from the previous
            and current financial years. Our friends at Convert2MYOB provide a
            fast, easy and secure conversion service. And, for a limited time
            it&apos;s free!
          </p>

          <p>To do this you will need your serial number {serialNumber}.</p>

          <Alert type="info" inline>
            <h4>Want to test drive MYOB before moving?</h4>
            Go for it! But anything you create now will be <b>
              overwritten
            </b>{' '}
            when your data is imported.
          </Alert>

          <LearnCallToAction>
            <ButtonRow
              secondary={[
                <Button
                  type="primary"
                  key="getStarted"
                  onClick={() => onGetStartedClick(moveToMYOBUrl)}
                >
                  Get started
                </Button>,
              ]}
            />
          </LearnCallToAction>
        </Column>

        <Column>
          <img
            alt="Move to MYOB"
            className={styles.img}
            height="100%"
            src={moveToMYOB}
            width="100%"
          />
        </Column>
      </Row>
    </LearnTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  moveToMYOBUrl: getMoveToMYOBUrl(state),
  serialNumber: getSerialNumber(state),
});

export default connect(mapStateToProps)(MoveToMYOBView);
