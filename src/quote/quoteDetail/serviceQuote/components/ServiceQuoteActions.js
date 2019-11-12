import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../ServiceQuoteSelectors';
import QuoteDetailActions from '../../components/QuoteDetailActions';

const ServiceQuoteActions = ({
  isCreating,
  isActionsDisabled,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConvertToInvoiceButtonClick,
  onExportPdfButtonClick,
  onSaveAndEmailButtonClick,
}) => (
  <QuoteDetailActions
    isCreating={isCreating}
    isActionsDisabled={isActionsDisabled}
    onSaveButtonClick={onSaveButtonClick}
    onSaveAndButtonClick={onSaveAndButtonClick}
    onCancelButtonClick={onCancelButtonClick}
    onDeleteButtonClick={onDeleteButtonClick}
    onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
    onExportPdfButtonClick={onExportPdfButtonClick}
    onSaveAndEmailButtonClick={onSaveAndEmailButtonClick}
  />
);

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(ServiceQuoteActions);
