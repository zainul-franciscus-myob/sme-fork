import {
  FieldGroup, Icons, Label, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilteredLeavePayItemOptions,
  getLeavePayItems,
  getStartDate,
  getTerminationDate,
} from '../selectors/PayrollLeaveDetailSelectors';
import PayrollLeaveDetailTable from './PayrollLeaveDetailTable';

const PayrollLeaveDetail = ({
  startDate,
  terminationDate,
  allocatedLeavePayItems,
  allocatedLeavePayItemOptions,
  onAddAllocatedLeaveItem,
  onRemoveAllocatedLeaveItem,
  onUpdateAllocatedLeaveItemCarryOver,
}) => {
  const details = (
    <FieldGroup label="Details">
      <Label color="light-grey" size="large">{startDate}</Label>
      &emsp;
      <Label color="light-grey" size="large">{terminationDate}</Label>
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

  return (
    <>
      {details}
      <FieldGroup label={fieldGroupLabel}>
        <PayrollLeaveDetailTable
          selected={allocatedLeavePayItems}
          items={allocatedLeavePayItemOptions}
          onAddAllocatedLeaveItem={onAddAllocatedLeaveItem}
          onRemoveAllocatedLeaveItem={onRemoveAllocatedLeaveItem}
          onUpdateCarryOver={onUpdateAllocatedLeaveItemCarryOver}
        />
      </FieldGroup>
    </>
  );
};

const mapStateToProps = state => ({
  startDate: getStartDate(state),
  terminationDate: getTerminationDate(state),
  allocatedLeavePayItems: getLeavePayItems(state),
  allocatedLeavePayItemOptions: getFilteredLeavePayItemOptions(state),
});

export default connect(mapStateToProps)(PayrollLeaveDetail);
