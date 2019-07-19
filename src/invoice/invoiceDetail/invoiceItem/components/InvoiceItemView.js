import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlertMessage, getModalType } from '../invoiceItemSelectors';
import InvoiceItemActions from './InvoiceItemActions';
import InvoiceItemHeader from './InvoiceItemHeader';
import InvoiceItemModal from './InvoiceItemModal';
import InvoiceItemOptions from './InvoiceItemOptions';
import InvoiceItemTable from './InvoiceItemTable';

const InvoiceItemView = ({
  modalType,
  alertMessage,
  onUpdateInvoiceOption,
  onUpdateTaxInclusive,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissAlert,
  onAddTableLine,
  onChangeTableRow,
  onRemoveTableRow,
  onLineInputBlur,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
}) => {
  const modal = modalType && (
    <InvoiceItemModal
      modalType={modalType}
      onModalClose={onModalClose}
      onCancelModalConfirm={onCancelModalConfirm}
      onDeleteModalConfirm={onDeleteModalConfirm}
    />
  );

  const templateOptions = (
    <InvoiceItemOptions
      onUpdateInvoiceOption={onUpdateInvoiceOption}
      onUpdateTaxInclusive={onUpdateTaxInclusive}
    />
  );

  const actions = (
    <InvoiceItemActions
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alert = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const invoiceItemTable = (
    <InvoiceItemTable
      onAddTableLine={onAddTableLine}
      onChangeTableRow={onChangeTableRow}
      onRemoveTableRow={onRemoveTableRow}
      onLineInputBlur={onLineInputBlur}
    />
  );

  return (
    <LineItemTemplate
      pageHead={<InvoiceItemHeader />}
      alert={alert}
      options={templateOptions}
      actions={actions}
    >
      {modal}

      {invoiceItemTable}

    </LineItemTemplate>
  );
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(InvoiceItemView);
