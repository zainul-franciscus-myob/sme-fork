import { Checkbox, FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../../supplierReturn/supplierReturnList/supplierReturnListSelectors';
import { getSupplierFilterOptions } from '../LinkBillSelectors';
import SupplierCombobox from '../../components/combobox/SupplierCombobox';
import handleCheckboxChange from '../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';

const LinkBillListOptions = ({
  supplierFilterOptions,
  filterOptions: {
    supplierId,
    showPaidBills,
  },
  onUpdateFilterOptions,
  onApplyFilters,
}) => (
  <FilterBar onApply={onApplyFilters}>
    <SupplierCombobox
      label="Supplier"
      name="supplier"
      hideLabel={false}
      items={supplierFilterOptions}
      selectedId={supplierId}
      onChange={handleComboboxChange('supplierId', onUpdateFilterOptions)}
    />
    <FilterBar.Item>
      <Checkbox
        name="showPaidBills"
        label="Show paid bills and returns"
        checked={showPaidBills}
        onChange={handleCheckboxChange(onUpdateFilterOptions)}
      />
    </FilterBar.Item>
  </FilterBar>
);

const mapStateToProps = state => ({
  supplierFilterOptions: getSupplierFilterOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(LinkBillListOptions);
