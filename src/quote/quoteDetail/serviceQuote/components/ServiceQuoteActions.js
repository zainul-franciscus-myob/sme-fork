import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../ServiceQuoteSelectors';
import QuoteDetailActions from '../../components/QuoteDetailActions';

const ServiceQuoteActions = ({
  isCreating,
  isActionsDisabled,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConvertToInvoiceButtonClick,
}) => (
  <QuoteDetailActions
    isCreating={isCreating}
    isActionsDisabled={isActionsDisabled}
    onSaveButtonClick={onSaveButtonClick}
    onCancelButtonClick={onCancelButtonClick}
    onDeleteButtonClick={onDeleteButtonClick}
    onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
  />
);

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(ServiceQuoteActions);
