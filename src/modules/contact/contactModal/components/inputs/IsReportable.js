import { Checkbox, CheckboxGroup, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsReportable } from '../../ContactModalSelectors';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';

const IsReportable = ({ isReportable, onChange }) => (
  <CheckboxGroup
    label="Reportable"
    hideLabel
    renderCheckbox={() => (
      <Checkbox
        id="isReportable"
        name="isReportable"
        label="Report payments to ATO via TPAR"
        labelAccessory={(
          <Tooltip>
            These are payments made to reportable contractors.
            They will be reported to the ATO in TPAR reports.
          </Tooltip>
        )}
        checked={isReportable}
        onChange={handleCheckboxChange(onChange)}
      />
    )}
  />
);

const mapStateToProps = state => ({
  isReportable: getIsReportable(state),
});

export default connect(mapStateToProps)(IsReportable);
