import { Checkbox, CheckboxGroup, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsReportable, getIsSupplier, getRegion } from '../contactDetailSelectors';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';

const IsReportableSection = ({
  region,
  isReportable,
  onContactDetailsChange,
  isSupplier,
}) => {
  const auView = (
    isSupplier && (
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
          onChange={handleCheckboxChange(onContactDetailsChange)}
        />
      )}
    />
    )
  );

  return {
    au: auView,
    nz: <></>,
  }[region];
};

const mapStateToProps = state => ({
  region: getRegion(state),
  isReportable: getIsReportable(state),
  isSupplier: getIsSupplier(state),
});

export default connect(mapStateToProps)(IsReportableSection);
