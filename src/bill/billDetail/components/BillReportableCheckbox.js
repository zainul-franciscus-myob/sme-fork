import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import React from 'react';

import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';

const BillReportableCheckbox = ({
  isReportable, region, name, onUpdateBillOption,
}) => ({
  au: <CheckboxGroup
    label="is reportable"
    hideLabel
    renderCheckbox={() => (
      <Checkbox
        name={name}
        label="Report to ATO via TPAR"
        checked={isReportable}
        onChange={handleCheckboxChange(onUpdateBillOption)}
      />
    )}
  />,
  nz: <></>,
}[region]);

export default BillReportableCheckbox;
