import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsActionDisabled, getIsOpen, getRegion, getTitle,
} from '../ContactModalSelectors';
import AuContactModalDetails from './au/ContactModalDetails';
import BillingAddress from './inputs/BillingAddress';
import ContactModalMoreInformation from './ContactModalMoreDetails';
import NzContactModalDetails from './nz/ContactModalDetails';
import PageView from '../../../components/PageView/PageView';
import ShippingAddress from './inputs/ShippingAddress';

const ContactModalView = ({
  region,
  alert,
  isOpen,
  title,
  isActionDisabled,
  onClose,
  onDismissAlert,
  onDetailChange,
  onBillingAddressButtonClick,
  onBillingAddressChange,
  onShippingAddressButtonClick,
  onShippingAddressChange,
  onCancelButtonClick,
  onSaveButtonClick,
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
        onToggle={onBillingAddressButtonClick}
        onChange={onBillingAddressChange}
      />
      <ShippingAddress
        onToggle={onShippingAddressButtonClick}
        onChange={onShippingAddressChange}
      />
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
        <Button type="secondary" onClick={onCancelButtonClick} disabled={isActionDisabled}>Cancel</Button>
        <Button type="primary" onClick={onSaveButtonClick} disabled={isActionDisabled}>Save</Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen ? modal : null;
};

const mapStateToProps = state => ({
  region: getRegion(state),
  alert: getAlert(state),
  isOpen: getIsOpen(state),
  title: getTitle(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(ContactModalView);
