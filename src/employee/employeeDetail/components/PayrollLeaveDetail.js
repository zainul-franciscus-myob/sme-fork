import {
  FieldGroup, Icons, Label, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLeaveDetail } from '../selectors/PayrollLeaveDetailSelectors';
import PayrollLeaveDetailModal from './PayrollLeaveDetailModal';
import PayrollLeaveDetailTable from './PayrollLeaveDetailTable';

const PayrollLeaveDetail = ({
  startDate,
  terminationDate,
  showAllocatedLeavePayItems,
  allocatedLeavePayItems,
  allocatedLeavePayItemOptions,
  allocatedLeavePayItemModal,
  onPayrollLeaveListeners: {
    onAddAllocatedLeaveItem,
    onRemoveAllocatedLeaveItem,
    onConfirmRemoveAllocatedLeaveItem,
    onConfirmCancelAllocatedLeaveItem,
    onUpdateAllocatedLeaveItemCarryOver,
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

const mapStateToProps = state => getLeaveDetail(state);

export default connect(mapStateToProps)(PayrollLeaveDetail);
