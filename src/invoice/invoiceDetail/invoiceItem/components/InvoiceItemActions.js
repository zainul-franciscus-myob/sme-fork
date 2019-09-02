import { connect } from 'react-redux';
import React from 'react';

import { getAreButtonsDisabled, getIsCreating } from '../invoiceItemSelectors';
import InvoiceDetailActions from '../../components/InvoiceDetailActions';

const InvoiceItemActions = ({
  isCreating,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onSaveAndEmailButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  areButtonsDisabled,
  onPayInvoiceButtonClick,
}) => (
  <InvoiceDetailActions
    isCreating={isCreating}
    areButtonsDisabled={areButtonsDisabled}
    onSaveButtonClick={onSaveButtonClick}
    onSaveAndButtonClick={onSaveAndButtonClick}
    onSaveAndEmailButtonClick={onSaveAndEmailButtonClick}
    onPayInvoiceButtonClick={onPayInvoiceButtonClick}
    onCancelButtonClick={onCancelButtonClick}
    onDeleteButtonClick={onDeleteButtonClick}
  />
);

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  areButtonsDisabled: getAreButtonsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceItemActions);
