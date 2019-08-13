import {
  FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDeductionPayItemModal } from '../../selectors/DeductionPayItemModalSelectors';
import {
  getDeductionPayItems,
  getFilteredDeductionPayItemOptions,
} from '../../selectors/PayrollDeductionDetailSelectors';
import DeductionPayItemModal from '../DeductionPayItemModal/DeductionPayItemModal';
import PayrollDeductionDetailsTable from './PayrollDeductionDetailsTable';

const PayrollDeductionDetails = ({
  deductionPayItems,
  deductionPayItemOptions,
  deductionPayItemModal,
  onAddPayrollDeductionPayItem,
  onRemovePayrollDeductionPayItem,
  onOpenDeductionPayItemModal,
  deductionPayItemModalListeners,
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
    <>
      { deductionPayItemModal && <DeductionPayItemModal {...deductionPayItemModalListeners} />}
      <FieldGroup label={fieldGroupLabel}>
        <PayrollDeductionDetailsTable
          selected={deductionPayItems}
          items={deductionPayItemOptions}
          onAddPayItem={onAddPayrollDeductionPayItem}
          onRemovePayItem={onRemovePayrollDeductionPayItem}
          onOpenDeductionPayItemModal={onOpenDeductionPayItemModal}
        />
      </FieldGroup>
      </>
  );
};

const mapStateToProps = state => ({
  deductionPayItems: getDeductionPayItems(state),
  deductionPayItemOptions: getFilteredDeductionPayItemOptions(state),
  deductionPayItemModal: getDeductionPayItemModal(state),
});

export default connect(mapStateToProps)(PayrollDeductionDetails);
