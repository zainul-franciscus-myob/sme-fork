import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilteredTaxPayItemOptions,
  getSelectedTaxPayItems,
  getSelectedTaxTable,
  getTaxDetails,
  getTaxPayItemModal,
  getTaxTableOptions,
} from '../../selectors/PayrollTaxSelectors';
import AddTaxPayItemTable from './AddTaxPayItemTable';
import TaxDetails from './TaxDetails';
import TaxPayItemModal from './TaxPayItemModal';

const PayrollTaxDetails = ({
  taxPayItems,
  taxPayItemOptions,
  taxTablesOptions,
  taxDetails,
  selectedTaxTable,
  taxPayItemModal,
  onAddPayrollTaxPayItem,
  onRemovePayrollTaxPayItem,
  onPayrollTaxDetailsChange,
  onPayrollTaxAmountBlur,
  onTaxPayItemClick,
  taxPayItemModalListeners,
}) => {
  const fieldGroupLabel = (
    <div>
      <span>Allocated tax pay items&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        PAYG Withholding will always be automatically allocated to
        your employees to help ensure correct tax is calculated for their pay
      </Tooltip>
    </div>
  );

  return (
    <>
      {taxPayItemModal && <TaxPayItemModal {...taxPayItemModalListeners} />}
      <TaxDetails
        taxTablesOptions={taxTablesOptions}
        taxDetails={taxDetails}
        selectedTaxTable={selectedTaxTable}
        onPayrollTaxDetailsChange={onPayrollTaxDetailsChange}
        onPayrollTaxAmountBlur={onPayrollTaxAmountBlur}
      />
      <hr />
      <FieldGroup label={fieldGroupLabel}>
        <AddTaxPayItemTable
          label="Add tax pay item"
          selected={taxPayItems}
          items={taxPayItemOptions}
          onAddPayItem={onAddPayrollTaxPayItem}
          onRemovePayItem={onRemovePayrollTaxPayItem}
          onTaxPayItemClick={onTaxPayItemClick}
        />
      </FieldGroup>
    </>
  );
};

const mapStateToProps = state => ({
  taxPayItems: getSelectedTaxPayItems(state),
  taxPayItemOptions: getFilteredTaxPayItemOptions(state),
  taxTablesOptions: getTaxTableOptions(state),
  taxDetails: getTaxDetails(state),
  selectedTaxTable: getSelectedTaxTable(state),
  taxPayItemModal: getTaxPayItemModal(state),
});

export default connect(mapStateToProps)(PayrollTaxDetails);
