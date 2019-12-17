import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getIsLoading, getModalType,
} from '../contactDetailSelectors';
import BillingAddress from './BillingAddress';
import CancelModal from '../../../../components/modal/CancelModal';
import ContactDetailActions from './ContactDetailActions';
import ContactDetails from './ContactDetails';
import ContactHeader from './ContactHeader';
import DeleteModal from '../../../../components/modal/DeleteModal';
import FormCard from '../../../../components/FormCard/FormCard';
import MoreDetails from './MoreDetails';
import PageView from '../../../../components/PageView/PageView';
import ShippingAddress from './ShippingAddress';

const ContactDetailView = ({
  isCreating,
  isLoading,
  modalType,
  alertMessage,
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
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this contact?"
      />
    );
  }

  const view = (
    <FormTemplate
      pageHead={<ContactHeader onRemindersButtonClick={onRemindersButtonClick} />}
      alert={alertComponent}
      sticky="none"
      actions={(
        <ContactDetailActions
          isCreating={isCreating}
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      )}
    >
      {modal}
      <FormCard>
        <ContactDetails
          isCreating={isCreating}
          onContactDetailsChange={onContactDetailsChange}
        />
        <BillingAddress onAddressChange={onBillingAddressChange} />
        <ShippingAddress onAddressChange={onShippingAddressChange} />
        <MoreDetails onContactDetailsChange={onContactDetailsChange} />
      </FormCard>

    </FormTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(ContactDetailView);
