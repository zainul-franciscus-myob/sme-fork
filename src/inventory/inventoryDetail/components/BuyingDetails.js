import {
  FieldGroup, Input,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBuyingDetails,
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

const BuyingDetails = ({
  buyingAccounts,
  taxCodes,
  buyingPrice,
  unitOfMeasure,
  taxLabel,
  onBuyingDetailsChange,
  allocateToAccountIndex,
  taxCodeId,
}) => (
  <FieldGroup label="Buying Details">
    <AccountCombobox
      label="Allocated to"
      hideLabel={false}
      items={buyingAccounts}
      selectedIndex={allocateToAccountIndex}
      allowClearSelection
      onChange={handleComboboxChange('allocateToAccountId', onBuyingDetailsChange)}
    />
    <Input
      type="number"
      name="buyingPrice"
      label="Buying price ($)"
      value={buyingPrice}
      onChange={handleInputChange(onBuyingDetailsChange)}
    />
    <TaxCodeCombobox
      items={taxCodes}
      selectedId={taxCodeId}
      label={taxLabel}
      allowClearSelection
      onChange={handleComboboxChange('taxCodeId', onBuyingDetailsChange)}
      hideLabel={false}
    />
    <Input
      name="unitOfMeasure"
      label="Unit of measure"
      value={unitOfMeasure}
      onChange={handleInputChange(onBuyingDetailsChange)}
      maxLength={5}
    />
  </FieldGroup>
);

BuyingDetails.propTypes = {
  buyingAccounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  taxCodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  buyingPrice: PropTypes.string.isRequired,
  unitOfMeasure: PropTypes.string.isRequired,
  taxLabel: PropTypes.string.isRequired,
  onBuyingDetailsChange: PropTypes.func.isRequired,
  allocateToAccountIndex: PropTypes.number.isRequired,
  taxCodeId: PropTypes.string.isRequired,
};

const mapStateToProps = state => getBuyingDetails(state);

export default connect(mapStateToProps)(BuyingDetails);
