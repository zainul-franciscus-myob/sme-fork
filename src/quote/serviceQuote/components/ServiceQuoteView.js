import {
  ButtonRow, Columns, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getIsLoading,
  getModalType,
} from '../ServiceQuoteSelectors';
import Alert from '../../../components/Alert/Alert';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ServiceQuoteActions from './ServiceQuoteActions';
import ServiceQuoteOptions from './ServiceQuoteOptions';
import ServiceQuoteTable from './ServiceQuoteTable';

const ServiceQuoteView = ({
  isLoading,
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
      <ServiceQuoteOptions
        onUpdateHeaderOptions={onUpdateHeaderOptions}
      />
    </Columns>
  );

  const actions = (
    <ButtonRow>
      <ServiceQuoteActions
        isCreating={isCreating}
        onSaveButtonClick={onSaveButtonClick}
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
        title="Cancel quote alterations"
        description="Are you sure you want to cancel the alterations in this quote?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete quote"
        description="Are you sure you want to delete this quote?"
      />
    );
  }

  const view = (
    <Fragment>
      {alertComponent}
      <LineItemTemplate pageHead="Quote" options={templateOptions} actions={actions}>
        { modal }
        <ServiceQuoteTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />
      </LineItemTemplate>
    </Fragment>
  );

  return isLoading ? <Spinner /> : view;
};

ServiceQuoteView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
  isLoading: getIsLoading(state),
  isCreating: getIsCreating(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(ServiceQuoteView);
