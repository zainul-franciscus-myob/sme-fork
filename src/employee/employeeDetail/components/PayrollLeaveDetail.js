import {
  FieldGroup, Icons, Label, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeaveDetail } from '../selectors/PayrollLeaveDetailSelectors';
import { getLeavePayItemModal } from '../selectors/LeavePayItemModalSelectors';
import LeavePayItemModal from './LeavePayItemModal/LeavePayItemModal';
import PayrollLeaveDetailModal from './PayrollLeaveDetailModal';
import PayrollLeaveDetailTable from './PayrollLeaveDetailTable';

const PayrollLeaveDetail = ({
  modalData,
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
  },
  leavePayItemModalListeners,
}) => {
  const modal = allocatedLeavePayItemModal && (
    <PayrollLeaveDetailModal
      payItem={allocatedLeavePayItemModal}
      onConfirm={onConfirmRemoveAllocatedLeaveItem}
      onCancel={onConfirmCancelAllocatedLeaveItem}
    />
  );

  const leavePayItemModal = modalData && (
    <LeavePayItemModal {...leavePayItemModalListeners} />
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
      />
    </FieldGroup>
  );

  return (
    <>
      {modal}
      {leavePayItemModal}
      {details}
      {leavePayItemComponent}
    </>
  );
};

const mapStateToProps = state => ({
  leaveDetail: getLeaveDetail(state),
  modalData: getLeavePayItemModal(state),
});

export default connect(mapStateToProps)(PayrollLeaveDetail);
