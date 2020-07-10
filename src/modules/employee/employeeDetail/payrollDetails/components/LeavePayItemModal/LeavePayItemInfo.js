import {
  Checkbox, CheckboxGroup, FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCarryRemainingLeave, getIsLeavePayItemModalCreating, getPrintOnPaySlip } from '../../selectors/LeavePayItemModalSelectors';
import LeavePayItemCalculationBasis from './LeavePayItemCalculationBasis';

const handleCheckBoxChange = handler => (e) => {
  const { name, checked } = e.target;
  handler({ key: name, value: checked });
};

const fieldGroupLabel = (
  <div>
    <span>Carry remaining leave over to next year&nbsp;</span>
    <Tooltip triggerContent={<Icons.Info />} placement="right">
      This setting cannot be changed after the leave accrual is created.
    </Tooltip>
  </div>
);

const LeavePayItemInfo = ({
  printOnPaySlip,
  carryRemainingLeave,
  isCreating,
  onCalculationBasisChange,
}) => (
  <FieldGroup label="Leave information">
    <LeavePayItemCalculationBasis onCalculationBasisChange={onCalculationBasisChange} />
    <CheckboxGroup
      label="Print on pay slip"
      hideLabel
      renderCheckbox={() => (
        <div>
          <Checkbox
            id="printOnPaySlip"
            name="printOnPaySlip"
            label="Print on pay slip"
            checked={printOnPaySlip}
            onChange={handleCheckBoxChange(onCalculationBasisChange)}
          />
          <Checkbox
            id="carryRemainingLeave"
            name="carryRemainingLeave"
            label={fieldGroupLabel}
            checked={carryRemainingLeave}
            disabled={!isCreating}
            onChange={handleCheckBoxChange(onCalculationBasisChange)}
          />
        </div>
      )}
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  printOnPaySlip: getPrintOnPaySlip(state),
  isCreating: getIsLeavePayItemModalCreating(state),
  carryRemainingLeave: getCarryRemainingLeave(state),
});

export default connect(mapStateToProps)(LeavePayItemInfo);
