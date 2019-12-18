import {
  FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDeductionPayItems,
  getFilteredDeductionPayItemOptions,
} from '../../selectors/PayrollDeductionDetailSelectors';
import PayrollDeductionDetailsTable from './PayrollDeductionDetailsTable';

const PayrollDeductionDetails = ({
  deductionPayItems,
  deductionPayItemOptions,
  onAddPayrollDeductionPayItem,
  onRemovePayrollDeductionPayItem,
  onOpenDeductionPayItemModal,
}) => {
  const fieldGroupLabel = (
    <div>
      <span>Allocated deduction pay items&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Add all the relevant deduction pay items for this employee
      </Tooltip>
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel}>
      <PayrollDeductionDetailsTable
        selected={deductionPayItems}
        items={deductionPayItemOptions}
        onAddPayItem={onAddPayrollDeductionPayItem}
        onRemovePayItem={onRemovePayrollDeductionPayItem}
        onOpenDeductionPayItemModal={onOpenDeductionPayItemModal}
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  deductionPayItems: getDeductionPayItems(state),
  deductionPayItemOptions: getFilteredDeductionPayItemOptions(state),
});

export default connect(mapStateToProps)(PayrollDeductionDetails);