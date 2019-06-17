import {
  Alert, FormTemplate, PageHead, Spinner,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getIsLoading, getModalType, getStatus, getTitle,
} from '../contactDetailSelectors';
import BillingAddress from './BillingAddress';
import CancelModal from '../../../components/modal/CancelModal';
import ContactDetailActions from './ContactDetailActions';
import ContactDetails from './ContactDetails';
import ContactHeader from './ContactHeader';
import DeleteModal from '../../../components/modal/DeleteModal';
import FormCard from '../../../components/FormCard/FormCard';
import MoreDetails from './MoreDetails';
import ShippingAddress from './ShippingAddress';

const ContactDetailView = ({
  isCreating,
  isLoading,
  modalType,
  alertMessage,
  title,
  status,
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
  onRemindersButtonClick,
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

  const pageHead = isCreating ? 'Create contact' : title;

  const view = (
    <FormTemplate
      pageHead={(
        <PageHead title={pageHead} tag={status} />
      )}
      alert={alertComponent}
    >
      {modal}
      {!isCreating && <ContactHeader onRemindersButtonClick={onRemindersButtonClick} />}
      <FormCard>
        <ContactDetails
          isCreating={isCreating}
          onContactDetailsChange={onContactDetailsChange}
        />
        <BillingAddress onAddressChange={onBillingAddressChange} />
        <ShippingAddress onAddressChange={onShippingAddressChange} />
        <MoreDetails onContactDetailsChange={onContactDetailsChange} />
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
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
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
  onRemindersButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  title: getTitle(state),
  status: getStatus(state),
});

export default connect(mapStateToProps)(ContactDetailView);
