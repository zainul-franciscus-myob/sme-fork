import { Alert, Button, Modal, Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsModalActionDisabled } from '../../selectors/invoiceDetailSelectors';
import { getPaymentOptions } from '../../selectors/paymentOptionsSelectors';
import InvoiceOnlinePaymentOptions from '../InvoiceOnlinePaymentOptions';
import PaymentsByDirectDeposit from '../paymentOptions/PaymentsByDirectDeposit';
import PaymentsByMail from '../paymentOptions/PaymentsByMail';

const InvoiceDetailPaymentSettingsModal = ({
  paymentOptions,
  alert,
  onCancel,
  onDismissAlert,
  onEditPreferences,
  onSetupPaymentOptions,
  onSubscribeNow,
  onUpdatePaymentOptions,
  onSavePaymentOptions,
  isActionsDisabled,
}) => (
  <Modal
    title="Invoice payment options"
    onCancel={onCancel}
    canClose={!isActionsDisabled}
  >
    <Modal.Body>
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}
      <div>
        Select the payment options you want to include on your sales invoice.
        You can update these details at any time in sales settings.
      </div>
      <Separator />

      <PaymentsByDirectDeposit
        paymentOptions={paymentOptions}
        onUpdatePaymentOptions={onUpdatePaymentOptions}
      />
      <PaymentsByMail
        paymentOptions={paymentOptions}
        onUpdatePaymentOptions={onUpdatePaymentOptions}
      />
      <Separator />
      <InvoiceOnlinePaymentOptions
        onEditPreferences={onEditPreferences}
        onSetupPaymentOptions={onSetupPaymentOptions}
        onSubscribeNow={onSubscribeNow}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isActionsDisabled}>
        Cancel
      </Button>
      <Button
        type="primary"
        onClick={onSavePaymentOptions}
        disabled={isActionsDisabled}
      >
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  paymentOptions: getPaymentOptions(state),
  isActionsDisabled: getIsModalActionDisabled(state),
});

export default connect(mapStateToProps)(InvoiceDetailPaymentSettingsModal);
