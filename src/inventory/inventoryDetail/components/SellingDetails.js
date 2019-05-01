import {
  FieldGroup, Input, RadioButtonGroup,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getSellingDetails,
} from '../inventoryDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const handleComboboxChange = (key, onBuyingDetailsChange) => (item) => {
  onBuyingDetailsChange({ key, value: item.id });
};

const handleInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const handleTaxInclusiveChange = onSellingDetailsChange => ({ value }) => {
  onSellingDetailsChange({
    key: 'isTaxInclusive',
    value: value === 'Tax inclusive',
  });
};

const SellingDetails = ({
  sellingAccounts,
  taxCodes,
  sellingPrice,
  isTaxInclusive,
  unitOfMeasure,
  taxLabel,
  allocateToAccountIndex,
  onSellingDetailsChange,
  taxCodeId,
}) => (
  <FieldGroup label="Selling Details">
    <AccountCombobox
      label="Allocated to"
      hideLabel={false}
      items={sellingAccounts}
      selectedIndex={allocateToAccountIndex}
      allowClearSelection
      onChange={handleComboboxChange('allocateToAccountId', onSellingDetailsChange)}
    />
    <Input
      type="number"
      name="sellingPrice"
      label="Selling price ($)"
      value={sellingPrice}
      onChange={handleInputChange(onSellingDetailsChange)}
    />
    <TaxCodeCombobox
      items={taxCodes}
      selectedId={taxCodeId}
      label={taxLabel}
      allowClearSelection
      onChange={handleComboboxChange('taxCodeId', onSellingDetailsChange)}
      hideLabel={false}
    />
    <RadioButtonGroup
      label="Selling price is"
      name="isTaxInclusive"
      options={['Tax inclusive', 'Tax exclusive']}
      onChange={handleTaxInclusiveChange(onSellingDetailsChange)}
      value={isTaxInclusive ? 'Tax inclusive' : 'Tax exclusive'}
    />
    <Input
      name="unitOfMeasure"
      label="Unit of measure"
      value={unitOfMeasure}
      onChange={handleInputChange(onSellingDetailsChange)}
      maxLength={5}
    />
  </FieldGroup>
);

SellingDetails.propTypes = {
  sellingAccounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  taxCodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sellingPrice: PropTypes.string.isRequired,
  unitOfMeasure: PropTypes.string.isRequired,
  isTaxInclusive: PropTypes.bool.isRequired,
  taxLabel: PropTypes.string.isRequired,
  onSellingDetailsChange: PropTypes.func.isRequired,
  allocateToAccountIndex: PropTypes.number.isRequired,
  taxCodeId: PropTypes.string.isRequired,
};

const mapStateToProps = state => getSellingDetails(state);

export default connect(mapStateToProps)(SellingDetails);
