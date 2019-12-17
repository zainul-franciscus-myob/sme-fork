import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getIsLoading,
  getModalType,
  getPageTitle,
} from '../SupplierReturnPurchaseSelector';
import PageView from '../../../components/PageView/PageView';
import SupplierReturnPurchaseCreateActions from './SupplierReturnPurchaseCreateActions';
import SupplierReturnPurchaseModal from './SupplierReturnPurchaseModal';
import SupplierReturnPurchaseOptions from './SupplierReturnPurchaseOptions';
import SupplierReturnPurchaseTable from './SupplierReturnPurchaseTable';
import SupplierReturnPurchaseUpdateActions from './SupplierReturnPurchaseUpdateActions';

const SupplierReturnPurchaseView = ({
  pageTitle,
  isLoading,
  isCreating,
  modalType,
  alertMessage,
  onCloseModal,
  onConfirmCancel,
  onConfirmDelete,
  onDismissAlert,
  onSaveButtonClick,
  onCancelCreateButtonClick,
  onCancelUpdateButtonClick,
  onDeleteButtonClick,
  onUpdatePurchaseOptions,
  onUpdateTableAmountFields,
  onFormatAmountInput,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const modal = modalType && (
    <SupplierReturnPurchaseModal
      modalType={modalType}
      onCloseModal={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
    />
  );

  const actions = isCreating ? (
    <SupplierReturnPurchaseCreateActions
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelCreateButtonClick}
    />
  ) : (
    <SupplierReturnPurchaseUpdateActions
      onCancelButtonClick={onCancelUpdateButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const view = (
    <LineItemTemplate
      pageHead={pageTitle}
      options={(
        <SupplierReturnPurchaseOptions onUpdatePurchaseOptions={onUpdatePurchaseOptions} />)}
      actions={actions}
      alert={alertComponent}
    >
      {modal}
      <SupplierReturnPurchaseTable
        onUpdateTableAmountFields={onUpdateTableAmountFields}
        onFormatAmountInput={onFormatAmountInput}
      />
    </LineItemTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  pageTitle: getPageTitle(state),
  isLoading: getIsLoading(state),
  isCreating: getIsCreating(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseView);
