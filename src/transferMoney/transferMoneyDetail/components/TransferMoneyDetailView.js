import { Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { getAlertMessage, getIsLoading, getModalType } from '../transferMoneyDetailSelectors';
import Alert from '../../../components/Alert/Alert';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import SimplePageTemplate from '../../../components/SimplePageTemplate/SimplePageTemplate';
import TransferMoneyDetailActions from './TranferMoneyDetailActions';
import TransferMoneyDetailForm from './TransferMoneyDetailForm';

const TransferMoneyDetailView = ({
  onUpdateForm,
  onAmountInputBlur,
  alertMessage,
  onDismissAlert,
  onSave,
  isCreating,
  modalType,
  onCancelModal,
  onCloseModal,
  onCancel,
  onDelete,
  onDeleteModal,
  isLoading,
}) => {
  const actions = (
    <TransferMoneyDetailActions
      isCreating={isCreating}
      onSave={onSave}
      onCancel={onCancel}
      onDelete={onDelete}
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
        title="Cancel transfer money"
        description="Are you sure you want to cancel this transfer money?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete transfer money"
        description="Are you sure you want to delete this transfer money entry?"
      />
    );
  }

  const view = (
    <Fragment>
      {alertComponent}
      <SimplePageTemplate pageHead="Transfer money">
        { modal }
        <TransferMoneyDetailForm
          isCreating={isCreating}
          onUpdateForm={onUpdateForm}
          onAmountInputBlur={onAmountInputBlur}
        />
        { actions }
      </SimplePageTemplate>
    </Fragment>
  );

  return isLoading ? <Spinner /> : view;
};

TransferMoneyDetailView.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  onUpdateForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onAmountInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailView);
