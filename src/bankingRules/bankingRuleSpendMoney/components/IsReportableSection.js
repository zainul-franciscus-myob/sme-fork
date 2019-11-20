import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsPaymentReportable, getIsPaymentReportableCheckboxDisabled, getRegion } from '../bankingRuleSpendMoneySelectors';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';

const IsReportableSection = ({
  region,
  isPaymentReportableCheckboxDisabled,
  isPaymentReportable,
  onRuleConditionsChange,
}) => {
  const auView = (
    <CheckboxGroup
      hideLabel
      label="Report to ATO via TPAR"
      renderCheckbox={() => (
        <Checkbox
          name="isPaymentReportable"
          label="Report to ATO via TPAR"
          checked={isPaymentReportable}
          onChange={handleCheckboxChange(onRuleConditionsChange)}
          disabled={isPaymentReportableCheckboxDisabled}
        />
      )}
    />);

  return {
    au: auView,
    nz: <></>,
  }[region];
};

const mapStateToProps = state => ({
  region: getRegion(state),
  isPaymentReportableCheckboxDisabled: getIsPaymentReportableCheckboxDisabled(state),
  isPaymentReportable: getIsPaymentReportable(state),
});

export default connect(mapStateToProps)(IsReportableSection);
