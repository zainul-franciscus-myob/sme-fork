import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getModalType, getPageTitle, getTotalAmount,
} from '../ItemQuoteSelectors';
import ItemQuoteActions from './ItemQuoteActions';
import ItemQuoteModal from './ItemQuoteModal';
import ItemQuoteOptions from './ItemQuoteOptions';
import ItemQuoteTable from './ItemQuoteTable';
import QuotePageHead from '../../components/QuotePageHead';

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
  pageTitle,
  isCreating,
  totalAmount,
}) => {
  const actions = (
    <ItemQuoteActions
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onCancelButtonClick={onCancelButtonClick}
    />
  );

  const alert = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const options = <ItemQuoteOptions onUpdateQuoteOption={onUpdateQuoteOption} />;

  const pageHead = (
    <QuotePageHead
      showTotalItems={isCreating}
      totalAmount={totalAmount}
      pageTitle={pageTitle}
    />
  );

  return (
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
        pageHead={pageHead}
        options={options}
        actions={actions}
        alert={alert}
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
};

const mapStateToProps = state => ({
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  pageTitle: getPageTitle(state),
  totalAmount: getTotalAmount(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(ItemQuoteView);
