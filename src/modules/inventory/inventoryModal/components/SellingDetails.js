import {
  Checkbox, CheckboxGroup, FieldGroup, Icons, Input, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsSelling,
  getSellingAccountId,
  getSellingAccountOptions,
  getSellingIsTaxInclusive,
  getSellingPrice,
  getSellingTaxCodeId,
  getSellingUnitOfMeasure,
  getTaxCodeOptions,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../selectors/InventoryModalSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './SellingDetails.module.css';

const SellingDetails = (
  {
    isSelling,
    price,
    isTaxInclusive,
    unitOfMeasure,
    accountId,
    taxCodeId,
    accountOptions,
    taxCodeOptions,
    taxCodeLabel,
    taxInclusiveLabel,
    taxExclusiveLabel,
    onUpdateSellingOption,
    onUpdateIsSelling,
  },

) => (
  <FieldGroup label="Selling details">
    <CheckboxGroup
      renderCheckbox={() => (
        <Checkbox label="I sell this item" checked={isSelling} name="isSelling" onChange={handleCheckboxChange(onUpdateIsSelling)} />
      )}
    />
    <AmountInput className={styles.price} textAlign="right" label="Selling price ($)" name="price" value={price} requiredLabel="This is required" onChange={handleAmountInputChange(onUpdateSellingOption)} />
    <BooleanRadioButtonGroup
      label="Selling price is"
      // rename due to conflicting isTaxInclusive on underlying page
      name="isTaxInclusiveForSellingDetails"
      value={isTaxInclusive}
      trueLabel={taxInclusiveLabel}
      falseLabel={taxExclusiveLabel}
      handler={onUpdateSellingOption}
    />
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
      onChange={handleInputChange(onUpdateSellingOption)}
      maxLength={5}
    />
    <AccountCombobox
      name="accountId"
      label="Account for tracking sales"
      selectedId={accountId}
      requiredLabel="This is required"
      items={accountOptions}
      onChange={handleComboboxChange('accountId', onUpdateSellingOption)}
    />
    <div className={styles.taxCodeOptions}>
      <TaxCodeCombobox
        label={taxCodeLabel}
        requiredLabel="This is required"
        name="taxCodeId"
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange('taxCodeId', onUpdateSellingOption)}
      />
    </div>
  </FieldGroup>
);

const mapStateToProps = state => ({
  isSelling: getIsSelling(state),
  price: getSellingPrice(state),
  isTaxInclusive: getSellingIsTaxInclusive(state),
  unitOfMeasure: getSellingUnitOfMeasure(state),
  accountId: getSellingAccountId(state),
  taxCodeId: getSellingTaxCodeId(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getSellingAccountOptions(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
}
);

export default connect(mapStateToProps)(SellingDetails);
