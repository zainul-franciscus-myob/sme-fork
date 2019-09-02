import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled, getIsCreating } from '../invoiceServiceSelectors';
import InvoiceDetailActions from '../../components/InvoiceDetailActions';


const InvoiceServiceActions = ({
  isCreating,
  isActionsDisabled,
  onCancelButtonClick,
  onSaveButtonClick,
  onSaveAndEmailButtonClick,
  onSaveAndButtonClick,
  onDeleteButtonClick,
  onPayInvoiceButtonClick,
}) => (
  <InvoiceDetailActions
    isCreating={isCreating}
    areButtonsDisabled={isActionsDisabled}
    onSaveButtonClick={onSaveButtonClick}
    onSaveAndEmailButtonClick={onSaveAndEmailButtonClick}
    onPayInvoiceButtonClick={onPayInvoiceButtonClick}
    onSaveAndButtonClick={onSaveAndButtonClick}
    onCancelButtonClick={onCancelButtonClick}
    onDeleteButtonClick={onDeleteButtonClick}
  />
);

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceServiceActions);
