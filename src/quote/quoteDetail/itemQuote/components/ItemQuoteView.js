import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlertMessage, getModalType } from '../ItemQuoteSelectors';
import ItemQuoteActions from './ItemQuoteActions';
import ItemQuoteModal from './ItemQuoteModal';
import ItemQuoteOptions from './ItemQuoteOptions';
import ItemQuoteTable from './ItemQuoteTable';

const ItemQuoteView = ({
  alertMessage,
  modalType,
  onUpdateQuoteOption,
  onTableRowAmountInputBlur,
  onAddTableRow,
  onChangeTableRow,
  onRemoveTableRow,
  onSaveButtonClick,
  onDeleteButtonClick,
  onCancelButtonClick,
  onDismissAlert,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onDismissModal,
}) => (
  <React.Fragment>
    {
      modalType && (
      <ItemQuoteModal
        onDismissModal={onDismissModal}
        onConfirmCancelButtonClick={onConfirmCancelButtonClick}
        onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
      />
      )
    }
    <LineItemTemplate
      pageHead="Quote"
      options={(
        <ItemQuoteOptions onUpdateQuoteOption={onUpdateQuoteOption} />
      )}
      actions={(
        <ItemQuoteActions
          onSaveButtonClick={onSaveButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onCancelButtonClick={onCancelButtonClick}
        />
      )}
      alert={alertMessage && (
      <Alert type="danger" onDismiss={onDismissAlert}>
        {alertMessage}
      </Alert>
      )}
    >
      <ItemQuoteTable
        onAddTableRow={onAddTableRow}
        onChangeTableRow={onChangeTableRow}
        onRemoveTableRow={onRemoveTableRow}
        onTableRowAmountInputBlur={onTableRowAmountInputBlur}
      />
    </LineItemTemplate>
  </React.Fragment>
);

const mapStateToProps = state => ({
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(ItemQuoteView);
