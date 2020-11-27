import {
  Alert,
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBuyingDetails,
  getIsEnableForBuying,
} from '../inventoryDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const BuyingDetails = ({
  enabled,
  buyingPrice,
  isTaxInclusive,
  unitOfMeasure,
  buyingAccounts,
  allocateToAccountId,
  taxCodes,
  taxCodeId,
  taxLabel,
  taxInclusiveLabel,
  taxExclusiveLabel,
  onBuyingDetailsChange,
  onEnableStateChange,
  isItemBuyingPriceTaxInclusiveEnabled,
  isItemBuyingPriceTaxInclusiveReadOnly,
  infoAlertText,
}) => (
  <>
    {infoAlertText !== '' && <Alert type="info">{infoAlertText}</Alert>}
    <FieldGroup label="Buying details">
      <CheckboxGroup
        hideLabel
        label="isBuyItem"
        renderCheckbox={(props) => (
          <Checkbox
            {...props}
            onChange={handleCheckboxChange(onEnableStateChange)}
            name="isBuyItem"
            label="I buy this item"
            checked={enabled}
          />
        )}
      />
      <AmountInput
        label="Buying price ($)"
        requiredLabel="This is required"
        name="buyingPrice"
        value={buyingPrice}
        onChange={handleAmountInputChange(onBuyingDetailsChange)}
        onBlur={handleAmountInputChange(onBuyingDetailsChange)}
        numeralIntegerScale={13}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
        disabled={!enabled}
        textAlign="right"
        width="sm"
      />
      {isItemBuyingPriceTaxInclusiveEnabled && (
        <BooleanRadioButtonGroup
          label="Buying price is"
          name="buyingPriceTaxInclusive"
          value={isTaxInclusive}
          trueLabel={taxInclusiveLabel}
          falseLabel={taxExclusiveLabel}
          disabled={!enabled || isItemBuyingPriceTaxInclusiveReadOnly}
          handler={onBuyingDetailsChange}
        />
      )}
      <Input
        name="unitOfMeasure"
        label="Unit of measure"
        disabled={!enabled}
        value={unitOfMeasure}
        labelAccessory={
          <Tooltip>Eg. boxes, cans, hours, kg (max 5 characters)</Tooltip>
        }
        onChange={handleInputChange(onBuyingDetailsChange)}
        maxLength={5}
        width="xs"
      />
      <AccountCombobox
        label="Account for tracking purchases"
        disabled={!enabled}
        requiredLabel="This is required"
        items={buyingAccounts}
        selectedId={allocateToAccountId}
        allowClear
        onChange={handleComboboxChange(
          'allocateToAccountId',
          onBuyingDetailsChange
        )}
      />
      <TaxCodeCombobox
        items={taxCodes}
        disabled={!enabled}
        selectedId={taxCodeId}
        requiredLabel="This is required"
        label={taxLabel}
        allowClear
        onChange={handleComboboxChange('taxCodeId', onBuyingDetailsChange)}
        width="sm"
      />
    </FieldGroup>
  </>
);

const mapStateToProps = (state) => ({
  ...getBuyingDetails(state),
  enabled: getIsEnableForBuying(state),
});

export default connect(mapStateToProps)(BuyingDetails);
