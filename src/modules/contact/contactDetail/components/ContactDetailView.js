import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getLoadingState,
  getModalType,
  getShouldShowPaymentDetails,
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
import PaymentDetails from './PaymentDetails';
import ShippingAddress from './ShippingAddress';

const ContactDetailView = ({
  accountModal,
  isCreating,
  loadingState,
  modalType,
  alertMessage,
  shouldShowPaymentDetails,
  onContactDetailsChange,
  onPaymentDetailsChange,
  onBillingAddressChange,
  onShippingAddressChange,
  onDismissAlert,
  onCancelModal,
  onDeleteModal,
  onCloseModal,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onAddAccount,
  onAbnBlur,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  let modal;
  if (modalType === 'cancel') {
    modal = <CancelModal onCancel={onCloseModal} onConfirm={onCancelModal} />;
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
      pageHead={<ContactHeader />}
      alert={alertComponent}
      sticky="none"
      actions={
        <ContactDetailActions
          isCreating={isCreating}
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      }
    >
      {accountModal}
      {modal}
      <FormCard>
        <ContactDetails
          isCreating={isCreating}
          onContactDetailsChange={onContactDetailsChange}
          onAddAccount={onAddAccount}
          onAbnBlur={onAbnBlur}
        />
        <BillingAddress onAddressChange={onBillingAddressChange} />
        <ShippingAddress onAddressChange={onShippingAddressChange} />
        {shouldShowPaymentDetails && (
          <PaymentDetails onPaymentDetailsChange={onPaymentDetailsChange} />
        )}
        <MoreDetails onContactDetailsChange={onContactDetailsChange} />
      </FormCard>
    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  loadingState: getLoadingState(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  shouldShowPaymentDetails: getShouldShowPaymentDetails(state),
});

export default connect(mapStateToProps)(ContactDetailView);
