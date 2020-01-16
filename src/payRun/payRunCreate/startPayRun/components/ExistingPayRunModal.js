import {
  Alert,
  Button,
  ButtonRow,
  FormHorizontal,
  Modal,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDateOfPayment,
  getPayPeriodEnd,
  getPayPeriodStart,
} from '../StartPayRunSelectors';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';
import styles from './StartPayRunView.module.css';

const ExistingPayRunModal = ({
  payPeriodStart,
  payPeriodEnd,
  dateOfPayment,
  onEditExistingPayRunClick,
  onGoBackButtonClick,
  onCreatePayRunClick,
}) => (
  <Modal
    title="Create pay run?"
    onCancel={onGoBackButtonClick}
    testid="existingPayRunModal"
  >
    <Modal.Body>
      <Alert type="warning">
          Looks like you&#39;ve got a pay run in progress.
          When you create this new pay run, the unfinished one will be discarded.
      </Alert>

      <FormHorizontal>
        <ReadOnly name="PayPeriodStart" label="Pay period start">{formatSlashDate(payPeriodStart)}</ReadOnly>
        <ReadOnly name="PayPeriodEnd" label="Pay period end">{formatSlashDate(payPeriodEnd)}</ReadOnly>
        <ReadOnly name="DateOfPayment" label="Date of payment">{formatSlashDate(dateOfPayment)}</ReadOnly>
      </FormHorizontal>

    </Modal.Body>
    <div className={styles.existingPayRunModalButtons}>
      <ButtonRow
        secondary={[
          <Button key="goBackButton" type="secondary" onClick={onGoBackButtonClick}>
              Go Back
          </Button>,
        ]}
        primary={[
          <Button key="editExistingPayRunButton" type="secondary" onClick={onEditExistingPayRunClick}>
              Edit existing pay run
          </Button>,
          <Button key="createPayRunButton" type="primary" onClick={onCreatePayRunClick}>
              Create pay run
          </Button>,
        ]}
      />
    </div>
  </Modal>);

const mapStateToProps = state => ({
  payPeriodStart: getPayPeriodStart(state),
  payPeriodEnd: getPayPeriodEnd(state),
  dateOfPayment: getDateOfPayment(state),
});

export default connect(mapStateToProps)(ExistingPayRunModal);
