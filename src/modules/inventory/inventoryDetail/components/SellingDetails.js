import {
  Checkbox, CheckboxGroup, FieldGroup, Input, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsEnableForSelling, getSellingDetails } from '../inventoryDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const SellingDetails = ({
  enabled,
  sellingPrice,
  isTaxInclusive,
  unitOfMeasure,
  sellingAccounts,
  allocateToAccountId,
  taxCodes,
  taxCodeId,
  taxLabel,
  taxInclusiveLabel,
  taxExclusiveLabel,
  onSellingDetailsChange,
  onEnableStateChange,
}) => (
  <FieldGroup label="Selling Details">
    <CheckboxGroup
      hideLabel
      label="isSellItem"
      renderCheckbox={props => (
        <Checkbox
          {...props}
          onChange={handleCheckboxChange(onEnableStateChange)}
          name="isSellItem"
          label="I sell this item"
          checked={enabled}
        />
      )}
    />
    <AmountInput
      label="Selling price ($)"
      requiredLabel="This is required"
      name="sellingPrice"
      value={sellingPrice}
      onChange={handleAmountInputChange(onSellingDetailsChange)}
      onBlur={handleAmountInputChange(onSellingDetailsChange)}
      numeralIntegerScale={13}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={6}
      disabled={!enabled}
      textAlign="right"
      width="sm"
    />
    <BooleanRadioButtonGroup
      label="Selling price is"
      name="isTaxInclusive"
      value={isTaxInclusive}
      trueLabel={taxInclusiveLabel}
      falseLabel={taxExclusiveLabel}
      disabled={!enabled}
      handler={onSellingDetailsChange}
    />
    <Input
      name="unitOfMeasure"
      label="Unit of measure"
      value={unitOfMeasure}
      disabled={!enabled}
      labelAccessory={(
        <Tooltip>
          Eg. boxes, cans, hours, kg
          (max 5 characters)
        </Tooltip>
      )}
      onChange={handleInputChange(onSellingDetailsChange)}
      maxLength={5}
      width="xs"
    />
    <AccountCombobox
      label="Account for tracking sales"
      items={sellingAccounts}
      requiredLabel="This is required"
      selectedId={allocateToAccountId}
      allowClear
      disabled={!enabled}
      onChange={handleComboboxChange('allocateToAccountId', onSellingDetailsChange)}
    />
    <TaxCodeCombobox
      items={taxCodes}
      requiredLabel="This is required"
      selectedId={taxCodeId}
      label={taxLabel}
      allowClear
      disabled={!enabled}
      onChange={handleComboboxChange('taxCodeId', onSellingDetailsChange)}
      width="sm"
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  ...getSellingDetails(state),
  enabled: getIsEnableForSelling(state),
});

export default connect(mapStateToProps)(SellingDetails);
