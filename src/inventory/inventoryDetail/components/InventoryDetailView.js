import {
  Alert, FormTemplate, Spinner,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsLoading, getModalType, getOriginalName,
} from '../inventoryDetailSelectors';
import BuyingDetails from './BuyingDetails';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import FormCard from '../../../components/FormCard/FormCard';
import InventoryDetailActions from './InventoryDetailActions';
import ItemDetails from './ItemDetails';
import SellingDetails from './SellingDetails';

const InventoryDetailView = ({
  isLoading,
  originalName,
  onItemDetailsChange,
  onSellingDetailsChange,
  onBuyingDetailsChange,
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
        title="Cancel item alterations"
        description="Are you sure you want to cancel the alterations in this item?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete item"
        description="Are you sure you want to delete this item?"
      />
    );
  }

  const pageHead = isCreating ? 'New item' : originalName;

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const itemDetailView = (
    <FormTemplate pageHead={pageHead} alert={alertComponent}>
      {modal}
      <FormCard>
        <ItemDetails onItemDetailsChange={onItemDetailsChange} />
        <SellingDetails onSellingDetailsChange={onSellingDetailsChange} />
        <BuyingDetails onBuyingDetailsChange={onBuyingDetailsChange} />
      </FormCard>
      <InventoryDetailActions
        isCreating={isCreating}
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </FormTemplate>
  );

  const view = isLoading ? (<Spinner />) : itemDetailView;

  return view;
};

InventoryDetailView.propTypes = {
  originalName: PropTypes.string.isRequired,
  onItemDetailsChange: PropTypes.func.isRequired,
  onSellingDetailsChange: PropTypes.func.isRequired,
  onBuyingDetailsChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  alertMessage: PropTypes.string.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  originalName: getOriginalName(state),
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(InventoryDetailView);
