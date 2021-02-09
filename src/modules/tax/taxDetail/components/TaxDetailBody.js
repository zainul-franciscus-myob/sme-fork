import {
  Checkbox,
  CheckboxGroup,
  Combobox,
  FieldGroup,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIncludeInGSTReturn,
  getIsGstReturnShown,
  getIsNTTaxCode,
  getIsReadOnly,
  getIsSTaxCode,
  getLinkedContactLabel,
  getTaxCodeDetails,
  getTaxCodeLabel,
  getTaxCollectedAccountLabel,
  getTaxPaidAccountLabel,
  getTaxTypeDetails,
  getTaxTypeLabel,
  getTaxTypeOptions,
} from '../taxDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import FormattedAmountInput from '../../../../components/autoFormatter/AmountInput/FormattedAmountInput';
import TaxDetailTable from './TaxDetailTable';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const TaxDetailBody = ({
  taxCodeDetails,
  taxTypeDetails,
  taxTypeOptions,
  accountOptions,
  taxCollectedAccountLabel,
  taxPaidAccountLabel,
  linkedContactLabel,
  taxCodeLabel,
  taxTypeLabel,
  isReadOnly,
  isNTTaxCode,
  isSTaxCode,
  isGstReturnShown,
  includeInGSTReturn,
  onChangeTaxField,
  renderContactCombobox,
}) => {
  const {
    code,
    description,
    type,
    rate,
    luxuryCarTax,
    taxCollectedAccountId,
    taxPaidAccountId,
    linkedContactId,
  } = taxCodeDetails;

  const {
    isTaxRateShown,
    isTaxCollectedAccountShown,
    isTaxPaidAccountShown,
    isLinkedContactShown,
    isChildrenTaxCodesShown,
    isLuxuryCarTaxThresholdShown,
  } = taxTypeDetails;

  return (
    <FieldGroup label="Tax code details">
      <Input
        name="code"
        label={taxCodeLabel}
        value={code}
        width="lg"
        maxLength={3}
        disabled={isNTTaxCode}
        onChange={handleInputChange(onChangeTaxField)}
      />
      <Input
        name="description"
        label="Description"
        value={description}
        width="lg"
        onChange={handleInputChange(onChangeTaxField)}
      />
      <Combobox
        name="type"
        label={taxTypeLabel}
        metaData={[{ columnName: 'type', showData: true }]}
        noMatchFoundMessage={'No tax type found'}
        items={taxTypeOptions}
        selected={{ type }}
        width="lg"
        disabled={isReadOnly} // disable all until Edit tax type feature is implemented
      />
      {isTaxRateShown && (
        <AmountInput
          name="rate"
          textAlign="right"
          label="Rate (%)"
          value={rate}
          width="lg"
          numeralIntegerScale={3}
          disabled={isNTTaxCode}
          onChange={handleInputChange(onChangeTaxField)}
        />
      )}
      {isGstReturnShown && (
        <CheckboxGroup
          label="GST return"
          renderCheckbox={() => (
            <Checkbox
              name="includeInGSTReturn"
              label="GST code is reported on GST return"
              checked={includeInGSTReturn}
              disabled={isSTaxCode}
              onChange={handleCheckboxChange(onChangeTaxField)}
            />
          )}
        />
      )}
      <br />
      {isTaxCollectedAccountShown && (
        <AccountCombobox
          name="taxCollectedAccountId"
          label={taxCollectedAccountLabel}
          items={accountOptions}
          selectedId={taxCollectedAccountId}
          width="lg"
          onChange={handleComboboxChange(
            'taxCollectedAccountId',
            onChangeTaxField
          )}
        />
      )}
      {isTaxPaidAccountShown && (
        <AccountCombobox
          name="taxPaidAccountId"
          label={taxPaidAccountLabel}
          items={accountOptions}
          selectedId={taxPaidAccountId}
          width="lg"
          onChange={handleComboboxChange('taxPaidAccountId', onChangeTaxField)}
        />
      )}
      {isLinkedContactShown &&
        renderContactCombobox({
          name: 'linkedContactId',
          selectedId: linkedContactId,
          label: linkedContactLabel,
          hideLabel: false,
          allowClear: true,
          width: 'lg',
          onChange: handleComboboxChange('linkedContactId', onChangeTaxField),
        })}
      {isLuxuryCarTaxThresholdShown && (
        <FormattedAmountInput
          name="luxuryCarTax"
          textAlign="right"
          label="Luxury Car Tax threshold ($)"
          value={luxuryCarTax}
          width="lg"
          numeralDecimalScaleMin={2}
          numeralDecimalScaleMax={2}
          numeralIntegerScale={13}
          onChange={handleInputChange(onChangeTaxField)}
        />
      )}
      <br />
      {isChildrenTaxCodesShown && <TaxDetailTable />}
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  taxCodeDetails: getTaxCodeDetails(state),
  taxTypeDetails: getTaxTypeDetails(state),
  taxTypeOptions: getTaxTypeOptions(state),
  accountOptions: getAccountOptions(state),
  taxCollectedAccountLabel: getTaxCollectedAccountLabel(state),
  taxPaidAccountLabel: getTaxPaidAccountLabel(state),
  linkedContactLabel: getLinkedContactLabel(state),
  taxTypeLabel: getTaxTypeLabel(state),
  taxCodeLabel: getTaxCodeLabel(state),
  isReadOnly: getIsReadOnly(state),
  isGstReturnShown: getIsGstReturnShown(state),
  includeInGSTReturn: getIncludeInGSTReturn(state),
  isNTTaxCode: getIsNTTaxCode(state),
  isSTaxCode: getIsSTaxCode(state),
});

export default connect(mapStateToProps)(TaxDetailBody);
