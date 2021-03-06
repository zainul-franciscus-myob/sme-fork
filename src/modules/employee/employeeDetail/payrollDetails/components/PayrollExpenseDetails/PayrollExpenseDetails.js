import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExpensePayItems,
  getFilteredExpensePayItemOptions,
} from '../../selectors/PayrollExpenseDetailSelectors';
import { getShowAddPayItemButton } from '../../../EmployeeDetailSelectors';
import PayrollExpenseDetailsTable from './PayrollExpenseDetailsTable';

const PayrollExpenseDetails = ({
  expensePayItems,
  expensePayItemOptions,
  onAddPayrollExpensePayItem,
  onRemovePayrollExpensePayItem,
  onOpenExpensePayItemModal,
  showAddPayItemButton,
  onAddPayItemComboBlur,
  onAddPayItemComboClick,
}) => {
  const fieldGroupLabel = (
    <div>
      <span>Allocated expense pay items&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Add all the relevant expense pay items for this employee
      </Tooltip>
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel}>
      <PayrollExpenseDetailsTable
        selected={expensePayItems}
        items={expensePayItemOptions}
        onAddPayItem={onAddPayrollExpensePayItem}
        onRemovePayItem={onRemovePayrollExpensePayItem}
        onOpenExpensePayItemModal={onOpenExpensePayItemModal}
        showAddPayItemButton={showAddPayItemButton}
        onAddPayItemComboBlur={onAddPayItemComboBlur}
        onAddPayItemComboClick={onAddPayItemComboClick}
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  expensePayItems: getExpensePayItems(state),
  expensePayItemOptions: getFilteredExpensePayItemOptions(state),
  showAddPayItemButton: getShowAddPayItemButton(state),
});

export default connect(mapStateToProps)(PayrollExpenseDetails);
