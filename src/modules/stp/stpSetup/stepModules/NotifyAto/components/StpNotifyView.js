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

import {
  getAlert,
  getIsLoading,
  getShowConfirmation,
  getSoftwareId,
} from '../stpNotifyAtoModuleSelectors';
import ConfirmationModal from './ConfirmationModal';
import LinkButton from '../../../../../../components/Button/LinkButton';
import LoadingPageState from '../../../../../../components/LoadingPageState/LoadingPageState';
import SoftwareDetailsView from './SoftwareDetailsView';
import styles from './StpNotifyAto.module.css';

const StpNotifyModuleView = ({
  onPreviousClick,
  onFinish,
  onNotifiedAtoClick,
  isLoading,
  softwareId,
  alert,
  showConfirmation,
  onCloseConfirmationModal,
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
      {
        showConfirmation
        && (
        <ConfirmationModal
          onCloseConfirmationModal={onCloseConfirmationModal}
          onSendButtonClick={onFinish}
        />
        )
      }
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
                <SoftwareDetailsView softwareId={softwareId} />
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
                <SoftwareDetailsView softwareId={softwareId} />
              </li>
              <li>
                Once confirmed, come back to this page and click I&apst;ve notified the ATO button.
              </li>
            </ol>
          </Card>
        </div>
        <LinkButton
          className={styles.linkButton}
          href="https://am.ato.gov.au/"
          icon={<Icons.OpenExternalLink />}
          iconRight
          isOpenInNewTab
        >
          Launch Access Manager
        </LinkButton>
        <Separator />
        <div>
          Read the detailed instructions:&nbsp;
          <a
            href="https://www.ato.gov.au/General/Online-services/In-detail/Using-Access-Manager/Using-Access-Manager/?page=5"
            target="_blank"
            rel="noreferrer noopener"
          >
            Notify us of a hosted SBR software service
          </a>
          &nbsp;(ATO website).
        </div>
      </Card>
      <ButtonRow
        primary={[
          <Button type="secondary" onClick={onPreviousClick} key="previous" testid="previousButton">Previous</Button>,
          <Button type="primary" onClick={onNotifiedAtoClick} key="notifiedAto" testid="notifiedAtoButton">I&apos;ve notified the ATO</Button>,
        ]}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  softwareId: getSoftwareId(state),
  showConfirmation: getShowConfirmation(state),
});

export default connect(mapStateToProps)(StpNotifyModuleView);
