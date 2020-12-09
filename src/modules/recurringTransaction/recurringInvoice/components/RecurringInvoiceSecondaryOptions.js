import { RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRecurringInvoiceOptions } from '../selectors/RecurringInvoiceSelectors';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import RecurringInvoiceOnlinePayment from './RecurringInvoiceOnlinePayment';

const RecurringInvoiceSecondaryOptions = ({
  expirationDays,
  expirationTerm,
  expirationTermOptions,
  isTaxInclusive,
  isSubmitting,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isReadOnly,
  shouldShowOnlinePayment,
  onUpdateHeaderOptions,
}) => {
  const onIsTaxInclusiveChange = (handler) => (e) => {
    handler({ key: 'isTaxInclusive', value: e.value === taxInclusiveLabel });
  };

  return (
    <div>
      <PaymentTerms
        label="Payment"
        disabled={isSubmitting || isReadOnly}
        onChange={onUpdateHeaderOptions}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
      />
      {shouldShowOnlinePayment && (
        <RecurringInvoiceOnlinePayment
          disabled={isSubmitting || isReadOnly}
          onUpdateOnlinePaymentOptions={onUpdateHeaderOptions}
          redirectToSetUpOnlinePayments={() => {}}
        />
      )}
      <RadioButtonGroup
        label="Amounts are"
        name="isTaxInclusive"
        value={isTaxInclusive ? taxInclusiveLabel : taxExclusiveLabel}
        options={[taxInclusiveLabel, taxExclusiveLabel]}
        onChange={onIsTaxInclusiveChange(onUpdateHeaderOptions)}
        disabled={isSubmitting || isReadOnly}
      />
    </div>
  );
};

const mapStateToProps = (state) => getRecurringInvoiceOptions(state);

export default connect(mapStateToProps)(RecurringInvoiceSecondaryOptions);
