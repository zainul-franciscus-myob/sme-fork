import {
  FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDeductionPayItems,
  getFilteredDeductionPayItemOptions,
} from '../selectors/PayrollDeductionDetailSelectors';
import PayrollDeductionDetailTable from './PayrollDeductionDetailTable';

const PayrollDeductionDetail = ({
  deductionPayItems,
  deductionPayItemOptions,
  onAddPayrollDeductionPayItem,
  onRemovePayrollDeductionPayItem,
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
      <PayrollDeductionDetailTable
        selected={deductionPayItems}
        items={deductionPayItemOptions}
        onAddPayItem={onAddPayrollDeductionPayItem}
        onRemovePayItem={onRemovePayrollDeductionPayItem}
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  deductionPayItems: getDeductionPayItems(state),
  deductionPayItemOptions: getFilteredDeductionPayItemOptions(state),
});

export default connect(mapStateToProps)(PayrollDeductionDetail);
