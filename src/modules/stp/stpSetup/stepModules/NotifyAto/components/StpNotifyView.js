import {
  Alert,
  Button,
  ButtonRow,
  Card,
  Icons,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getBusinessSid, getIsLoading } from '../stpNotifyAtoModuleSelectors';
import LoadingPageState from '../../../../../../components/LoadingPageState/LoadingPageState';
import SoftwareDetailsView from './SoftwareDetailsView';
import styles from './StpNotifyAto.module.css';


const StpNotifyModuleView = ({
  onPreviousClick,
  onFinish,
  onAccessManagerLinkClick,
  onHostedSbrLinkClick,
  isLoading,
  businessSid,
  alert,
}) => {
  if (isLoading) {
    return (
      <Card>
        <LoadingPageState />
      </Card>
    );
  }

  return (
    <div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <Card header={<h2>Notify the ATO you&apos;re using MYOB for payroll reporting</h2>}>
        <p>
          To start using Single Touch Payroll reporting you&apos;ll need to
          nominate MYOB as your online software provider in tone two ways.
        </p>
        <div className={styles.innerCard}>

          <Card header={<h3>Option 1. Phone the ATO on 1300 85 22 32</h3>}>
            <p>
              This only takes a few minutes.&nbsp;
              Make sure you have your own TFN, ABN or RAN (for agents), to verify your identity.
            </p>
            <ol>
              <li>
                Follow the prompts and provide the following details
                <SoftwareDetailsView businessSid={businessSid} />
              </li>
              <li>
                Once confirmed, click I&apos;ve notified the ATO on this page.
              </li>
            </ol>
          </Card>
          <Card header={<h3>Option 2. Create notification in Access Manager</h3>}>
            <p>
              If you have an Access Manager account, you can notify the ATO online.
              You can also create an Access Manager account.
            </p>
            <ol>
              <li>
                Log into Access Manager.
              </li>
              <li>
                Click My hosted SBR software services from the left hand menu.
              </li>
              <li>
                Click Notify the ATO of your hosted service.
              </li>
              <li>
                Complete all steps using the following details.
                <SoftwareDetailsView businessSid={businessSid} />
              </li>
              <li>
                Once confirmed, come back to this page and click I&apst;ve notified the ATO button.
              </li>
            </ol>
          </Card>
        </div>
        <p>
          <Button type="link" icon={<Icons.OpenExternalLink />} iconRight onClick={onAccessManagerLinkClick}>Launch Access Manager</Button>
        </p>
        <Separator />
        <p>
          Read the detailed instructions:
          <Button type="link" onClick={onHostedSbrLinkClick}>Notify us of a hosted SBR software service</Button>
          &nbsp;(ATO website).
        </p>
      </Card>
      <ButtonRow
        primary={[
          <Button type="secondary" onClick={onPreviousClick} key="previous" testid="previousButton">Previous</Button>,
          <Button type="primary" onClick={onFinish} key="finish" testid="finishButton">I&apos;ve notified the ATO</Button>,
        ]}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  businessSid: getBusinessSid(state),
});

export default connect(mapStateToProps)(StpNotifyModuleView);
