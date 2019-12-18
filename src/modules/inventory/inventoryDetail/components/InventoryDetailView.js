import {
  Alert, FormTemplate, Label, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getIsInactive,
  getIsLoading,
  getModalType,
  getOriginalName,
} from '../inventoryDetailSelectors';
import BuyingDetails from './BuyingDetails';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import FormCard from '../../../../components/FormCard/FormCard';
import InventoryDetailActions from './InventoryDetailActions';
import ItemDetails from './ItemDetails';
import PageView from '../../../../components/PageView/PageView';
import SellingDetails from './SellingDetails';

const InventoryDetailView = ({
  isLoading,
  isInactive,
  originalName,
  onItemDetailsChange,
  onSellingDetailsChange,
  onBuyingDetailsChange,
  onEnableForSellingChange,
  onEnableForBuyingChange,
  onSaveButtonClick,
  alertMessage,
  onDismissAlert,
  isCreating,
  onDeleteButtonClick,
  modalType,
  onCloseModal,
  onDeleteModal,
  onCancelButtonClick,
  onCancelModal,
}) => {
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
        title="Delete this item?"
      />
    );
  }

  const pageHead = isCreating ? 'Create item' : <PageHead title={originalName} tag={isInactive && <Label type="boxed">Inactive</Label>} />;

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const pageFooter = (
    <InventoryDetailActions
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const itemDetailView = (
    <FormTemplate
      sticky="none"
      pageHead={pageHead}
      alert={alertComponent}
      actions={pageFooter}
    >
      {modal}
      <FormCard>
        <ItemDetails onItemDetailsChange={onItemDetailsChange} />
        <SellingDetails
          onSellingDetailsChange={onSellingDetailsChange}
          onEnableStateChange={onEnableForSellingChange}
        />
        <BuyingDetails
          onBuyingDetailsChange={onBuyingDetailsChange}
          onEnableStateChange={onEnableForBuyingChange}
        />
      </FormCard>
    </FormTemplate>
  );

  return <PageView isLoading={isLoading} view={itemDetailView} />;
};

const mapStateToProps = state => ({
  originalName: getOriginalName(state),
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
  isInactive: getIsInactive(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(InventoryDetailView);
