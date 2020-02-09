import {
  FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExpensePayItems,
  getFilteredExpensePayItemOptions,
  getShowAddExpensePayItemButton,
} from '../../selectors/PayrollExpenseDetailSelectors';
import PayrollExpenseDetailsTable from './PayrollExpenseDetailsTable';

const PayrollExpenseDetails = ({
  expensePayItems,
  expensePayItemOptions,
  onAddPayrollExpensePayItem,
  onRemovePayrollExpensePayItem,
  onOpenExpensePayItemModal,
  showAddExpensePayItemButton,
  onAddExpensePayItemButtonClick,
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
        showAddExpensePayItemButton={showAddExpensePayItemButton}
        onAddExpensePayItemButtonClick={onAddExpensePayItemButtonClick}
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  expensePayItems: getExpensePayItems(state),
  expensePayItemOptions: getFilteredExpensePayItemOptions(state),
  showAddExpensePayItemButton: getShowAddExpensePayItemButton(state),
});

export default connect(mapStateToProps)(PayrollExpenseDetails);
