import { Checkbox, CheckboxGroup, FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCarryRemainingLeave, getPrintOnPaySlip } from '../../selectors/LeavePayItemModalSelectors';
import LeavePayItemCalculationBasis from './LeavePayItemCalculationBasis';

const handleCheckBoxChange = handler => (e) => {
  const { name, checked } = e.target;
  handler({ key: name, value: checked });
};

const LeavePayItemInfo = ({
  printOnPaySlip,
  carryRemainingLeave,
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
            label="Carry remaining leave over to next year"
            checked={carryRemainingLeave}
            onChange={handleCheckBoxChange(onCalculationBasisChange)}
          />
        </div>
      )}
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  printOnPaySlip: getPrintOnPaySlip(state),
  carryRemainingLeave: getCarryRemainingLeave(state),
});

export default connect(mapStateToProps)(LeavePayItemInfo);
