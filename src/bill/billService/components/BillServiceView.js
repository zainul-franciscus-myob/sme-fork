import {
  Alert, Columns, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getModalType,
} from '../billServiceSelectors';
import BillServiceActions from './BillServiceActions';
import BillServiceOptions from './BillServiceOptions';
import BillServiceTable from './BillServiceTable';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';

const BillServiceView = ({
  onUpdateHeaderOptions,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  isCreating,
  modalType,
  onCloseModal,
  onCancelModal,
  alertMessage,
  onDismissAlert,
  onDeleteModal,
}) => {
  const templateOptions = (
    <Columns type="three">
      <BillServiceOptions
        onUpdateHeaderOptions={onUpdateHeaderOptions}
      />
    </Columns>
  );

  const actions = (
    <BillServiceActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

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
        title="Cancel bill alterations"
        description="Are you sure you want to cancel the alterations in this bill?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete bill"
        description="Are you sure you want to delete this bill?"
      />
    );
  }

  const view = (
    <LineItemTemplate pageHead="Bill" alert={alertComponent} options={templateOptions} actions={actions}>
      { modal }
      <BillServiceTable
        onUpdateRow={onUpdateRow}
        onAddRow={onAddRow}
        onRemoveRow={onRemoveRow}
        onRowInputBlur={onRowInputBlur}
      />
    </LineItemTemplate>
  );

  return view;
};

BillServiceView.propTypes = {
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(BillServiceView);
