import {
  Checkbox, CheckboxGroup, FieldGroup, Icons, Input, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBuyingAccountId,
  getBuyingAccountOptions,
  getBuyingPrice,
  getBuyingTaxCodeId,
  getBuyingUnitOfMeasure,
  getIsBuying,
  getTaxCodeOptions,
} from '../selectors/InventoryModalSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './BuyingDetails.module.css';

const BuyingDetails = ({
  isBuying,
  price,
  unitOfMeasure,
  accountId,
  taxCodeId,
  taxCodeOptions,
  taxCodeLabel,
  accountOptions,
  onUpdateBuyingOption,
  onUpdateIsBuying,
}) => (
  <FieldGroup label="Buying details">
    <CheckboxGroup
      renderCheckbox={() => (
        <Checkbox label="I buy this item" checked={isBuying} name="isBuying" onChange={handleCheckboxChange(onUpdateIsBuying)} />
      )}
    />
    <AmountInput className={styles.price} label="Buying price ($)" name="price" value={price} requiredLabel="This is required" onChange={handleAmountInputChange(onUpdateBuyingOption)} />
    <Input
      className={styles.unitOfMeasure}
      label="Unit of measure"
      name="unitOfMeasure"
      value={unitOfMeasure}
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          Eg. boxes, cans, hours, kg (max 5 characters)
        </Tooltip>
      )}
      onChange={handleInputChange(onUpdateBuyingOption)}
      maxLength={5}
    />
    <AccountCombobox
      name="accountId"
      label="Account for tracking purchases"
      selectedId={accountId}
      requiredLabel="This is required"
      items={accountOptions}
      onChange={handleComboboxChange('accountId', onUpdateBuyingOption)}
    />
    <div className={styles.taxCodeOptions}>
      <TaxCodeCombobox
        label={taxCodeLabel}
        requiredLabel="This is required"
        name="taxCodeId"
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange('taxCodeId', onUpdateBuyingOption)}
      />
    </div>
  </FieldGroup>
);

const mapStateToProps = state => ({
  isBuying: getIsBuying(state),
  price: getBuyingPrice(state),
  unitOfMeasure: getBuyingUnitOfMeasure(state),
  accountId: getBuyingAccountId(state),
  taxCodeId: getBuyingTaxCodeId(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getBuyingAccountOptions(state),
});

export default connect(mapStateToProps)(BuyingDetails);
