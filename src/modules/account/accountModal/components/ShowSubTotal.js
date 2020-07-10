import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubtotalReportable } from '../accountModalSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const ShowSubTotal = ({ isSubtotalReportable, onChange }) => (
  <CheckboxGroup
    label="Show subtotal"
    hideLabel
    renderCheckbox={() => (
      <Checkbox
        name="isSubtotalReportable"
        label="Show a subtotal for this section on reports"
        checked={isSubtotalReportable}
        onChange={handleCheckboxChange(onChange)}
      />
    )}
  />
);

const mapStateToProps = (state) => ({
  isSubtotalReportable: getIsSubtotalReportable(state),
});

export default connect(mapStateToProps)(ShowSubTotal);
