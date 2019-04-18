import {
  Alert, FormTemplate, Spinner,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getContactHeader, getIsLoading, getModalType,
} from '../contactDetailSelectors';
import BillingAddress from './BillingAddress';
import BusinessDetails from './BusinessDetails';
import CancelModal from '../../../components/modal/CancelModal';
import ContactDetailActions from './ContactDetailActions';
import ContactDetails from './ContactDetails';
import DeleteModal from '../../../components/modal/DeleteModal';
import FormCard from '../../../components/FormCard/FormCard';
import ShippingAddress from './ShippingAddress';

const ContactDetailView = ({
  isCreating,
  isLoading,
  modalType,
  alertMessage,
  contactHeader,
  onBusinessDetailsChange,
  onContactDetailsChange,
  onBillingAddressChange,
  onShippingAddressChange,
  onDismissAlert,
  onCancelModal,
  onDeleteModal,
  onCloseModal,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
        title="Cancel contact alterations"
        description="Are you sure you want to cancel the alterations in this contact?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete contact"
        description="Are you sure you want to delete this contact transaction?"
      />
    );
  }

  const pageHead = isCreating ? 'Add contact' : contactHeader;

  const view = (
    <FormTemplate pageHead={pageHead} alert={alertComponent}>
      {modal}
      <FormCard>
        <BusinessDetails
          isCreating={isCreating}
          onBusinessDetailsChange={onBusinessDetailsChange}
        />
        <ContactDetails onContactDetailsChange={onContactDetailsChange} />
        <ShippingAddress onAddressChange={onShippingAddressChange} />
        <BillingAddress onAddressChange={onBillingAddressChange} />
      </FormCard>
      <ContactDetailActions
        isCreating={isCreating}
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </FormTemplate>
  );

  return (
    isLoading ? <Spinner /> : view
  );
};

ContactDetailView.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  contactHeader: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
  onBusinessDetailsChange: PropTypes.func.isRequired,
  onContactDetailsChange: PropTypes.func.isRequired,
  onShippingAddressChange: PropTypes.func.isRequired,
  onBillingAddressChange: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  contactHeader: getContactHeader(state),
});

export default connect(mapStateToProps)(ContactDetailView);
