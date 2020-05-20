import {
  Alert,
  Button,
  ButtonRow,
  Card,
  FormTemplate,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getApplicationPreference,
  getCopyAlertState,
  getCopyAlertText,
} from '../BankFeedsConnectSelectors';
import BankFeedsConnectForm from './BankFeedsConnectForm';
import BankFeedsConnectOnline from './BankFeedsConnectOnline';
import PageView from '../../../../components/PageView/PageView';
import styles from './BankFeedsConnectView.module.css';

const BankFeedsConnectView = ({
  applicationPreference,
  copyAlertState,
  copyAlertText,
  onCopy,
  redirectToBankFeeds,
  setCopyAlertText,
}) => {
  const applicationPreferenceOnline = applicationPreference === 'online';

  const view = (
    <div className={styles.connectForm}>
      <FormTemplate
        actions={(
          <ButtonRow>
            <Button type="secondary" onClick={redirectToBankFeeds}>Done</Button>
          </ButtonRow>
        )}
        pageHead={
          <PageHead
            title={
              applicationPreferenceOnline
                ? 'Connect to online banking'
                : 'Sign the authority form'
            }
          />
        }
      >
        { copyAlertState && <Alert type="success">{copyAlertText}</Alert> }

        <Card
          body={
            <Card.Body
              child={
                applicationPreferenceOnline
                  ? <BankFeedsConnectOnline onCopy={onCopy} setCopyAlertText={setCopyAlertText} />
                  : <BankFeedsConnectForm onCopy={onCopy} setCopyAlertText={setCopyAlertText} />
              }
            />
          }
          classes="bankFeedsConnect"
        />
      </FormTemplate>
    </div>
  );

  return <PageView view={view} />;
};

const mapStateToProps = state => ({
  applicationPreference: getApplicationPreference(state),
  copyAlertState: getCopyAlertState(state),
  copyAlertText: getCopyAlertText(state),
});

export default connect(mapStateToProps)(BankFeedsConnectView);
