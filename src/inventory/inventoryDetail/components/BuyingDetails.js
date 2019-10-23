import {
  Checkbox, CheckboxGroup,
  FieldGroup, Input, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBuyingDetails, getIsEnableForBuying,
} from '../inventoryDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './InventoryDetailView.module.css';

const BuyingDetails = ({
  enabled,
  buyingPrice,
  unitOfMeasure,
  buyingAccounts,
  allocateToAccountId,
  taxCodes,
  taxCodeId,
  taxLabel,
  onBuyingDetailsChange,
  onEnableStateChange,
}) => (
  <FieldGroup label="Buying Details">
    <CheckboxGroup
      hideLabel
      label="isBuyItem"
      renderCheckbox={props => (
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
      className={styles.price}
      label="Buying price ($)"
      requiredLabel="This is required"
      name="buyingPrice"
      value={buyingPrice}
      onChange={handleAmountInputChange(onBuyingDetailsChange)}
      numeralIntegerScale={13}
      decimalScale={5}
      disabled={!enabled}
      textAlign="right"
    />
    <Input
      className={styles.unitOfMeasure}
      name="unitOfMeasure"
      label="Unit of measure"
      disabled={!enabled}
      value={unitOfMeasure}
      labelAccessory={(
        <Tooltip>
          Eg. boxes, cans, hours, kg
          (max 5 characters)
        </Tooltip>
      )}
      onChange={handleInputChange(onBuyingDetailsChange)}
      maxLength={5}
    />
    <AccountCombobox
      label="Account for tracking purchase"
      disabled={!enabled}
      requiredLabel="This is required"
      items={buyingAccounts}
      selectedId={allocateToAccountId}
      allowClearSelection
      onChange={handleComboboxChange('allocateToAccountId', onBuyingDetailsChange)}
    />
    <div className={styles.taxCode}>
      <TaxCodeCombobox
        items={taxCodes}
        disabled={!enabled}
        selectedId={taxCodeId}
        requiredLabel="This is required"
        label={taxLabel}
        allowClearSelection
        onChange={handleComboboxChange('taxCodeId', onBuyingDetailsChange)}
      />
    </div>
  </FieldGroup>
);

const mapStateToProps = state => ({
  ...getBuyingDetails(state),
  enabled: getIsEnableForBuying(state),
});

export default connect(mapStateToProps)(BuyingDetails);
