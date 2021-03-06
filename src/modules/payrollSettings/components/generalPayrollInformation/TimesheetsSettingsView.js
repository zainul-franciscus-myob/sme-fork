import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Select,
} from '@myob/myob-widgets';
import React from 'react';

import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const TimesheetsSettingsView = ({
  useTimesheets,
  useTimesheetsWeekStarts,
  onGeneralPayrollInformationChange,
  onUseTimesheetsChange,
}) => (
  <FieldGroup label="Timesheets">
    <CheckboxGroup
      label="useTimesheets"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="useTimesheets"
          label="Use timesheets to track employee hours"
          value={useTimesheets}
          onChange={handleCheckboxChange(onUseTimesheetsChange)}
          checked={useTimesheets}
        />
      )}
    />
    <Select
      name="useTimesheetsWeekStarts"
      label="Week starts on"
      value={useTimesheetsWeekStarts}
      onChange={handleSelectChange(onGeneralPayrollInformationChange)}
      disabled={!useTimesheets}
      width="xl"
    >
      {days.map((day) => (
        <Select.Option key={day} value={day} label={day} />
      ))}
    </Select>
  </FieldGroup>
);

export default TimesheetsSettingsView;
