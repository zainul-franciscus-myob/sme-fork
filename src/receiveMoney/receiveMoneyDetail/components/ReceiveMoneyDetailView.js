import {
  ButtonRow, Columns, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getAlertMessage, getIsLoading, getModalType } from '../receiveMoneyDetailSelectors';
import Alert from '../../../components/Alert/Alert';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ReceiveMoneyDetailActions from './ReceiveMoneyDetailActions';
import ReceiveMoneyDetailOptions from './ReceiveMoneyDetailOptions';
import ReceiveMoneyDetailTable from './ReceiveMoneyDetailTable';

const ReceiveMoneyDetailView = ({
  onCancelButtonClick,
  onDeleteButtonClick,
  onCancelModal,
  onCloseModal,
  alertMessage,
  onDismissAlert,
  isLoading,
  modalType,
}) => {
  const templateOptions = (
    <Columns type="three">
      <ReceiveMoneyDetailOptions />
    </Columns>
  );

  const actions = (
    <ButtonRow>
      <ReceiveMoneyDetailActions
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </ButtonRow>
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
        title="Cancel receive money alterations"
        description="Are you sure you want to cancel the alterations in this receive money?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
        title="Delete transaction"
        description="Are you sure you want to delete this receive money transaction?"
      />
    );
  }

  const view = (
    <React.Fragment>
      {alertComponent}
      <LineItemTemplate
        pageHead="Receive Money Entry"
        options={templateOptions}
        actions={actions}
      >
        { modal }
        <ReceiveMoneyDetailTable
          onRemoveRow={() => {}}
          onUpdateRow={() => {}}
        />
      </LineItemTemplate>
    </React.Fragment>
  );

  return (
    isLoading ? <Spinner /> : view
  );
};

ReceiveMoneyDetailView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailView);
