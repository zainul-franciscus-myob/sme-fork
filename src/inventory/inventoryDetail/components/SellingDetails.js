import {
  Input, InputLabel, RadioButton,
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

const handleRadioChange = onSellingDetailsChange => (e) => {
  const { value, name } = e.target;

  onSellingDetailsChange({
    key: name,
    value: value === 'true',
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
  selectedTaxCodeIndex,
}) => (
  <React.Fragment>
    <h2>Selling details</h2>
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
      selectedIndex={selectedTaxCodeIndex}
      label={taxLabel}
      allowClearSelection
      onChange={handleComboboxChange('taxCodeId', onSellingDetailsChange)}
      hideLabel={false}
    />
    <div className="form-group">
      <InputLabel label="Selling price is" id="isTaxInclusive" />
      <div>
        <div><RadioButton name="isTaxInclusive" label="Tax inclusive" value="true" checked={isTaxInclusive} onChange={handleRadioChange(onSellingDetailsChange)} /></div>
        <div><RadioButton name="isTaxInclusive" label="Tax exclusive" value="false" checked={!isTaxInclusive} onChange={handleRadioChange(onSellingDetailsChange)} /></div>
      </div>
    </div>
    <Input
      name="unitOfMeasure"
      label="Unit of measure"
      value={unitOfMeasure}
      onChange={handleInputChange(onSellingDetailsChange)}
      maxLength={5}
    />
  </React.Fragment>
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
  selectedTaxCodeIndex: PropTypes.number.isRequired,
};

const mapStateToProps = state => getSellingDetails(state);

export default connect(mapStateToProps)(SellingDetails);
