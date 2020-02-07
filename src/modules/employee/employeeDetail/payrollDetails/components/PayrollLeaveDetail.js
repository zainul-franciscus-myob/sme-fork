import {
  FieldGroup, Icons, Label, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeaveDetail, getShowAddLeavePayItemButton } from '../selectors/PayrollLeaveDetailSelectors';
import PayrollLeaveDetailModal from './PayrollLeaveDetailModal';
import PayrollLeaveDetailTable from './PayrollLeaveDetailTable';

const PayrollLeaveDetail = ({
  showAddLeavePayItemButton,
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
    onUpdateAllocatedLeaveItemCarryOver,
    onAddLeavePayItemButtonClick,
  },
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
        onUpdateCarryOver={onUpdateAllocatedLeaveItemCarryOver}
        onOpenLeavePayItemModal={onOpenLeavePayItemModal}
        showAddLeavePayItemButton={showAddLeavePayItemButton}
        onAddLeavePayItemButtonClick={onAddLeavePayItemButtonClick}
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
  showAddLeavePayItemButton: getShowAddLeavePayItemButton(state),
});

export default connect(mapStateToProps)(PayrollLeaveDetail);
