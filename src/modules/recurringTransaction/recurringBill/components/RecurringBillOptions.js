import { DetailHeader, FieldGroup, ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getExpirationDays,
  getExpirationTerm,
  getExpirationTermOptions,
  getIsReadOnly,
  getIsReportable,
  getIsSubmitting,
  getIsTaxInclusive,
  getRegion,
  getShouldShowAbn,
  getSupplierAddress,
  getSupplierId,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../selectors/RecurringBillSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import RecurringBillAbnPopover from './RecurringBillAbnPopover';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './RecurringBillOptions.module.css';

const handleContactComboboxChange = (key, handler) => (item) => {
  handler({ key, item });
};

const RecurringBillOptions = ({
  region,
  supplierId,
  supplierAddress,
  isReportable,
  expirationTerm,
  expirationDays,
  expirationTermOptions,
  isTaxInclusive,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isSubmitting,
  isReadOnly,
  shouldShowAbn,
  renderContactCombobox,
  listeners: { onInputAlert, onUpdateBillHeaderOption, onUpdateSupplier },
}) => {
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
          selectedId: supplierId,
          name: 'supplierId',
          label: 'Supplier',
          hideLabel: false,
          requiredLabel: 'This is required',
          allowClear: true,
          disabled: isSubmitting || isReadOnly,
          onChange: handleContactComboboxChange('supplierId', onUpdateSupplier),
          onAlert: onInputAlert,
          width: 'xl',
        })}
        {shouldShowAbn && <RecurringBillAbnPopover />}
      </div>
      {supplierAddress && (
        <ReadOnly label="Billing address" className={styles.address}>
          {supplierAddress}
        </ReadOnly>
      )}
      <ReportableCheckbox
        label="Report to ATO via TPAR"
        checked={isReportable}
        region={region}
        name="isReportable"
        onChange={handleCheckboxChange(onUpdateBillHeaderOption)}
        disabled={isSubmitting || isReadOnly}
        width="xl"
      />
    </>
  );

  const secondary = (
    <>
      <PaymentTerms
        label="Payment"
        disabled={isReadOnly}
        onChange={onUpdateBillHeaderOption}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
      />
      <BooleanRadioButtonGroup
        name="isTaxInclusive"
        label="Amounts are"
        value={isTaxInclusive}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateBillHeaderOption}
        disabled={isSubmitting || isReadOnly}
      />
    </>
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

const mapStateToProps = (state) => ({
  region: getRegion(state),
  supplierId: getSupplierId(state),
  supplierAddress: getSupplierAddress(state),
  isReportable: getIsReportable(state),
  expirationTermOptions: getExpirationTermOptions(state),
  expirationDays: getExpirationDays(state),
  expirationTerm: getExpirationTerm(state),
  isTaxInclusive: getIsTaxInclusive(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
  shouldShowAbn: getShouldShowAbn(state),
});

export default connect(mapStateToProps)(RecurringBillOptions);
