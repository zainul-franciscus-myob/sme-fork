import { Alert, Button, ButtonRow, Card, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getATOInstructionsLink,
  getAgentPortalLink,
  getAgentRoleText,
  getErrorMessage,
} from '../stpAddClientsSelectors';
import LinkButton from '../../../../../../components/Button/LinkButton';
import styles from './StpAddClientsView.module.css';

const StpAddClientsView = ({
  agentRole,
  onNextClick,
  onPreviousClick,
  instructionsLink,
  portalLink,
  errorMessage,
}) => (
  <div>
    {errorMessage && <Alert type="danger">{errorMessage}</Alert>}
    <Card header={<h2>{`Launch ${agentRole} portal`}</h2>}>
      <Alert type="info">
        If you have already done this, you can skip this step.
      </Alert>
      <p>
        You need to add this business to your client list. Make sure the client
        has authorised you to act on their behalf.
      </p>
      <div className={styles.divP}>
        Detailed instructions:&nbsp;
        <a href={instructionsLink} target="_blank" rel="noreferrer noopener">
          Adding and removing clients
        </a>
        &nbsp;(ATO Website)
      </div>
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
            <LinkButton
              className={styles.linkButton}
              href={portalLink}
              isOpenInNewTab
              icon={<Icons.OpenExternalLink />}
              iconRight
            >
              {`Launch ${agentRole} Portal`}
            </LinkButton>
          </ol>
        </Card>
      </div>
    </Card>
    <ButtonRow
      primary={[
        <Button
          type="secondary"
          testid="previousButton"
          onClick={onPreviousClick}
          key="previousButton"
        >
          Previous
        </Button>,
        <Button
          type="primary"
          testid="nextButton"
          onClick={onNextClick}
          key="nextButton"
        >
          Next
        </Button>,
      ]}
    />
  </div>
);

const mapStateToProps = (state) => ({
  agentRole: getAgentRoleText(state),
  errorMessage: getErrorMessage(state),
  instructionsLink: getATOInstructionsLink(state),
  portalLink: getAgentPortalLink(state),
});

export default connect(mapStateToProps)(StpAddClientsView);
