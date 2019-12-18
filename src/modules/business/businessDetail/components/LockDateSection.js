import {
  Checkbox, CheckboxGroup, DatePicker,
  FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLockDateDetails } from '../businessDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleDatePickerChange from '../../../../components/handlers/handleDatePickerChange';
import styles from './LockDateSection.module.css';

const LockDateSection = ({
  hasLockPeriod,
  lockDate,
  onChange,
}) => (
  <FieldGroup label="Lock date" className={styles.lockDate}>
    <CheckboxGroup
      label="hasLockPeriod"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="hasLockPeriod"
          label="Prevent changes prior to the lock date"
          labelAccessory={(
            <Tooltip triggerContent={<Icons.Info />}>
              Prevent transactions from being added, edited or deleted
              if they are prior to the lock date entered.
            </Tooltip>
          )}
          checked={hasLockPeriod}
          onChange={handleCheckboxChange(onChange)}
        />
      )}
    />
    <DatePicker
      label="Lock date"
      name="lockDate"
      value={lockDate}
      disabled={!hasLockPeriod}
      onSelect={handleDatePickerChange(onChange, 'lockDate')}
    />
  </FieldGroup>
);

const mapStateToProps = state => getLockDateDetails(state);

export default connect(mapStateToProps)(LockDateSection);
