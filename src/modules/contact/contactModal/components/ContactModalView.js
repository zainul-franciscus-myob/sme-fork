import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsOpen,
  getRegion,
  getShouldShowPaymentDetails,
  getTitle,
} from '../ContactModalSelectors';
import AuContactModalDetails from './au/ContactModalDetails';
import BillingAddress from './inputs/BillingAddress';
import ContactModalMoreInformation from './ContactModalMoreDetails';
import NzContactModalDetails from './nz/ContactModalDetails';
import PageView from '../../../../components/PageView/PageView';
import PaymentDetailsWithToggle from './inputs/PaymentDetailsWithToggle';
import ShippingAddress from './inputs/ShippingAddress';

const ContactModalView = ({
  region,
  alert,
  isOpen,
  title,
  isActionDisabled,
  shouldShowPaymentDetails,
  onClose,
  onDismissAlert,
  onDetailChange,
  onBillingAddressButtonClick,
  onBillingAddressChange,
  onShippingAddressButtonClick,
  onShippingAddressChange,
  onPaymentDetailsButtonClick,
  onPaymentDetailsChange,
  onCancelButtonClick,
  onSaveButtonClick,
  onCopyToggle,
}) => {
  const alertComponent = alert && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const ContactModalDetails = {
    au: AuContactModalDetails,
    nz: NzContactModalDetails,
  }[region];

  const view = (
    <>
      <ContactModalDetails onChange={onDetailChange} />
      <BillingAddress
        title={'Billing Address'}
        onToggle={onBillingAddressButtonClick}
        onChange={onBillingAddressChange}
      />
      <ShippingAddress
        title={'Shipping Address'}
        onToggle={onShippingAddressButtonClick}
        onChange={onShippingAddressChange}
        onCopyToggle={onCopyToggle}
      />
      {shouldShowPaymentDetails && (
        <PaymentDetailsWithToggle
          onToggle={onPaymentDetailsButtonClick}
          onPaymentDetailsChange={onPaymentDetailsChange}
        />
      )}
      <ContactModalMoreInformation onChange={onDetailChange} />
    </>
  );

  const modal = (
    <Modal
      title={title}
      onCancel={onClose}
      canClose={!isActionDisabled}
      size="small"
    >
      <Modal.Body>
        {alertComponent}
        <PageView isLoading={isActionDisabled} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCancelButtonClick}
          disabled={isActionDisabled}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onSaveButtonClick}
          disabled={isActionDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen ? modal : null;
};

const mapStateToProps = (state) => ({
  region: getRegion(state),
  alert: getAlert(state),
  isOpen: getIsOpen(state),
  title: getTitle(state),
  isActionDisabled: getIsActionDisabled(state),
  shouldShowPaymentDetails: getShouldShowPaymentDetails(state),
});

export default connect(mapStateToProps)(ContactModalView);
