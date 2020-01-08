import {
  Alert, Button, ButtonRow, Card, Icons, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAgentRoleText, getErrorMessage } from '../stpAddClientsSelectors';
import styles from './StpAddClients.module.css';

const StpAddClientsView = ({
  agentRole,
  onNextClick,
  onPreviousClick,
  onInstructionsLinkClick,
  onPortalLinkClick,
  errorMessage,
}) => (
  <div>
    {errorMessage && (<Alert type="danger">{errorMessage}</Alert>)}
    <Card header={<Card.Header child={<PageHead title={`Launch ${agentRole} portal`} />} />}>
      <Alert type="info">If you have already done this, you can skip this step.</Alert>
      <p>
        You need to add this business to your client list. Make sure the client has authorised you
        to act on their behalf.
      </p>
      <p>
        Detailed instructions:&nbsp;
        <Button type="link" onClick={onInstructionsLinkClick}>Adding and removing clients</Button>
        &nbsp;(ATO Website)
      </p>
      <div className={styles.innerCard}>
        <Card header={<h3>Add a client</h3>}>
          <ol>
            <li>
            Log in to the
              <strong>{` ${agentRole} portal.`}</strong>
            </li>
            <li>
            Click&nbsp;
              <strong>Your clients</strong>
              &nbsp;in the left menu and select&nbsp;
              <strong>Add client.</strong>
            </li>
            <li>Enter client details.</li>
            <li>
            Come back to this page and click&nbsp;
              <strong>Next</strong>
            </li>
            <p>
              <Button type="link" icon={<Icons.OpenExternalLink />} iconRight onClick={onPortalLinkClick}>{`Launch ${agentRole} Portal`}</Button>
            </p>
          </ol>
        </Card>
      </div>
    </Card>
    <ButtonRow
      primary={[
        <Button type="secondary" testid="previousButton" onClick={onPreviousClick} key="previousButton">Previous</Button>,
        <Button type="primary" testid="nextButton" onClick={onNextClick} key="nextButton">Next</Button>,
      ]}
    />
  </div>
);

const mapStateToProps = state => ({
  agentRole: getAgentRoleText(state),
  errorMessage: getErrorMessage(state),
});

export default connect(mapStateToProps)(StpAddClientsView);
