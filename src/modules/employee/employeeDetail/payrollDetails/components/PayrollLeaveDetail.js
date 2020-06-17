import {
  FieldGroup, Icons, Label, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeaveDetail } from '../selectors/PayrollLeaveDetailSelectors';
import { getShowAddPayItemButton } from '../../EmployeeDetailSelectors';
import PayrollLeaveDetailModal from './PayrollLeaveDetailModal';
import PayrollLeaveDetailTable from './PayrollLeaveDetailTable';

const PayrollLeaveDetail = ({
  showAddPayItemButton,
  leaveDetail: {
    startDate,
    terminationDate,
    allocatedLeavePayItems,
    allocatedLeavePayItemOptions,
    showAllocatedLeavePayItems,
    allocatedLeavePayItemModal,
  },
  onPayrollLeaveListeners: {
    onOpenLeavePayItemModal,
    onAddAllocatedLeaveItem,
    onRemoveAllocatedLeaveItem,
    onConfirmRemoveAllocatedLeaveItem,
    onConfirmCancelAllocatedLeaveItem,
    onUpdateBalanceItemAdjustment,
  },
  onAddPayItemComboBlur,
  onAddPayItemComboClick,
}) => {
  const modal = allocatedLeavePayItemModal && (
    <PayrollLeaveDetailModal
      payItem={allocatedLeavePayItemModal}
      onConfirm={onConfirmRemoveAllocatedLeaveItem}
      onCancel={onConfirmCancelAllocatedLeaveItem}
    />
  );

  const details = (
    <FieldGroup label="Details">
      <Label color="light-grey">{`Start date ${startDate}`}</Label>
      &emsp;
      <Label color="light-grey">{`Termination date ${terminationDate}`}</Label>
    </FieldGroup>
  );

  const fieldGroupLabel = (
    <div>
      <span>Allocated leave pay items&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Add all the relevant leave pay items for this employee
      </Tooltip>
    </div>
  );

  const leavePayItemComponent = showAllocatedLeavePayItems && (
    <FieldGroup label={fieldGroupLabel}>
      <PayrollLeaveDetailTable
        selected={allocatedLeavePayItems}
        items={allocatedLeavePayItemOptions}
        onAddAllocatedLeaveItem={onAddAllocatedLeaveItem}
        onRemoveAllocatedLeaveItem={onRemoveAllocatedLeaveItem}
        onUpdateBalanceAdjustment={onUpdateBalanceItemAdjustment}
        onOpenLeavePayItemModal={onOpenLeavePayItemModal}
        showAddPayItemButton={showAddPayItemButton}
        onAddPayItemComboBlur={onAddPayItemComboBlur}
        onAddPayItemComboClick={onAddPayItemComboClick}
      />
    </FieldGroup>
  );

  return (
    <>
      {modal}
      {details}
      {leavePayItemComponent}
    </>
  );
};

const mapStateToProps = state => ({
  leaveDetail: getLeaveDetail(state),
  showAddPayItemButton: getShowAddPayItemButton(state),
});

export default connect(mapStateToProps)(PayrollLeaveDetail);
