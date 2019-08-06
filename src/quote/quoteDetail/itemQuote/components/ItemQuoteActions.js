import { connect } from 'react-redux';
import React from 'react';

import { getIsCalculating, getIsCreating, getIsSubmitting } from '../ItemQuoteSelectors';
import QuoteDetailActions from '../../components/QuoteDetailActions';

const ItemQuoteActions = ({
  isCreating,
  isSubmitting,
  isCalculating,
  onSaveButtonClick,
  onDeleteButtonClick,
  onCancelButtonClick,
  onConvertToInvoiceButtonClick,
}) => (
  <QuoteDetailActions
    isCreating={isCreating}
    isActionsDisabled={isSubmitting || isCalculating}
    onSaveButtonClick={onSaveButtonClick}
    onCancelButtonClick={onCancelButtonClick}
    onDeleteButtonClick={onDeleteButtonClick}
    onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
  />
);

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(ItemQuoteActions);
