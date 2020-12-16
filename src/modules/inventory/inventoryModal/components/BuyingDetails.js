import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Icons,
  Input,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBuyingAccountId,
  getBuyingAccountOptions,
  getBuyingIsTaxInclusive,
  getBuyingPrice,
  getBuyingTaxCodeId,
  getBuyingUnitOfMeasure,
  getIsBuying,
  getIsItemBuyingPriceTaxInclusiveReadOnly,
  getTaxCodeOptions,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
  getinfoAlertText,
} from '../selectors/InventoryModalSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const BuyingDetails = ({
  isBuying,
  isTaxInclusiveForBuyingDetails,
  price,
  unitOfMeasure,
  accountId,
  taxCodeId,
  taxCodeOptions,
  taxCodeLabel,
  taxInclusiveLabel,
  taxExclusiveLabel,
  accountOptions,
  onUpdateBuyingOption,
  onUpdateIsBuying,
  isItemBuyingPriceTaxInclusiveEnabled,
  isItemBuyingPriceTaxInclusiveReadOnly,
  infoAlertText,
}) => (
  <FieldGroup label="Buying details">
    <CheckboxGroup
      renderCheckbox={() => (
        <Checkbox
          label="I buy this item"
          checked={isBuying}
          name="isBuying"
          onChange={handleCheckboxChange(onUpdateIsBuying)}
        />
      )}
    />
    <AmountInput
      textAlign="right"
      label="Buying price ($)"
      name="price"
      value={price}
      requiredLabel="This is required"
      onChange={handleAmountInputChange(onUpdateBuyingOption)}
      onBlur={handleAmountInputChange(onUpdateBuyingOption)}
      numeralIntegerScale={13}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={6}
      width="sm"
    />
    {isItemBuyingPriceTaxInclusiveEnabled && (
      <BooleanRadioButtonGroup
        label="Buying price is"
        name="isTaxInclusiveForBuyingDetails"
        value={isTaxInclusiveForBuyingDetails}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateBuyingOption}
        disabled={isItemBuyingPriceTaxInclusiveReadOnly}
        labelAccessory={
          infoAlertText != null &&
          infoAlertText !== '' && (
            <Tooltip triggerContent={<Icons.Info />}>{infoAlertText}</Tooltip>
          )
        }
      />
    )}
    <Input
      label="Unit of measure"
      name="unitOfMeasure"
      value={unitOfMeasure}
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          Eg. boxes, cans, hours, kg (max 5 characters)
        </Tooltip>
      }
      onChange={handleInputChange(onUpdateBuyingOption)}
      maxLength={5}
      width="xs"
    />
    <AccountCombobox
      name="accountId"
      label="Account for tracking purchases"
      selectedId={accountId}
      requiredLabel="This is required"
      items={accountOptions}
      onChange={handleComboboxChange('accountId', onUpdateBuyingOption)}
    />
    <TaxCodeCombobox
      label={taxCodeLabel}
      requiredLabel="This is required"
      name="taxCodeId"
      items={taxCodeOptions}
      selectedId={taxCodeId}
      onChange={handleComboboxChange('taxCodeId', onUpdateBuyingOption)}
      width="sm"
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  isBuying: getIsBuying(state),
  price: getBuyingPrice(state),
  unitOfMeasure: getBuyingUnitOfMeasure(state),
  accountId: getBuyingAccountId(state),
  taxCodeId: getBuyingTaxCodeId(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getBuyingAccountOptions(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
  isTaxInclusiveForBuyingDetails: getBuyingIsTaxInclusive(state),
  isItemBuyingPriceTaxInclusiveReadOnly: getIsItemBuyingPriceTaxInclusiveReadOnly(
    state
  ),
  infoAlertText: getinfoAlertText(state),
});

export default connect(mapStateToProps)(BuyingDetails);
