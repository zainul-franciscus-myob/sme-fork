import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilteredTaxPayItemOptions,
  getSelectedTaxPayItems,
  getSelectedTaxTable,
  getTaxDetails,
  getTaxFileNumberStatus,
  getTaxFileNumberStatusOptions,
  getTaxTableOptions,
} from '../../selectors/PayrollTaxSelectors';
import AddTaxPayItemTable from './AddTaxPayItemTable';
import TaxDetails from './TaxDetails';

const PayrollTaxDetails = ({
  taxPayItems,
  taxPayItemOptions,
  taxTablesOptions,
  taxDetails,
  selectedTaxTable,
  onAddPayrollTaxPayItem,
  onRemovePayrollTaxPayItem,
  onPayrollTaxDetailsChange,
  onTaxPayItemClick,
  taxFileNumberStatusOptions,
  taxFileNumberStatus,
  onTaxFileNumberStatusChange,
  onTfnModalLinkClick,
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
      <TaxDetails
        taxTablesOptions={taxTablesOptions}
        taxDetails={taxDetails}
        selectedTaxTable={selectedTaxTable}
        onPayrollTaxDetailsChange={onPayrollTaxDetailsChange}
        taxFileNumberStatusOptions={taxFileNumberStatusOptions}
        taxFileNumberStatus={taxFileNumberStatus}
        onTaxFileNumberStatusChange={onTaxFileNumberStatusChange}
        onTfnModalLinkClick={onTfnModalLinkClick}
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
  taxFileNumberStatusOptions: getTaxFileNumberStatusOptions(state),
  taxFileNumberStatus: getTaxFileNumberStatus(state),
});

export default connect(mapStateToProps)(PayrollTaxDetails);
