import {
  DetailHeader,
  FieldGroup,
  RadioButtonGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import { getRecurringInvoiceOptions } from '../selectors/RecurringInvoiceSelectors';
import InvoiceAbnPopover from './RecurringInvoiceAbnPopover';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import RecurringInvoiceOnlinePayment from './RecurringInvoiceOnlinePayment';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import styles from './RecurringInvoiceOptions.module.css';

const RecurringInvoiceOptions = ({
  customerId,
  address,
  expirationDays,
  expirationTerm,
  expirationTermOptions,
  isTaxInclusive,
  isSubmitting,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isReadOnly,
  shouldShowAbn,
  shouldShowOnlinePayment,
  renderContactCombobox,
  onInputAlert,
  onUpdateHeaderOptions,
}) => {
  const onIsTaxInclusiveChange = (handler) => (e) => {
    handler({ key: 'isTaxInclusive', value: e.value === taxInclusiveLabel });
  };

  const requiredLabel = 'This is required';

  const primary = (
    <>
      <div
        className={classnames(
          styles.formControlWrapper,
          styles.contactComboBox,
          {
            [styles.maximiseContactCombobox]: !shouldShowAbn,
          }
        )}
      >
        {renderContactCombobox({
          selectedId: customerId,
          name: 'customerId',
          label: 'Customer',
          hideLabel: false,
          requiredLabel,
          allowClear: true,
          disabled: isSubmitting || isReadOnly,
          width: 'xl',
          onChange: handleAutoCompleteChange(
            'customerId',
            onUpdateHeaderOptions
          ),
          onAlert: onInputAlert,
        })}
        {shouldShowAbn && <InvoiceAbnPopover />}
      </div>
      {address && (
        <ReadOnly label="Billing address" className={styles.address}>
          {address}
        </ReadOnly>
      )}
    </>
  );

  const secondary = (
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

  return (
    <FieldGroup
      label="Create a transaction with this information"
      className={styles.options}
    >
      <DetailHeader
        primary={primary}
        secondary={secondary}
        className={styles.detail}
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getRecurringInvoiceOptions(state);

export default connect(mapStateToProps)(RecurringInvoiceOptions);
