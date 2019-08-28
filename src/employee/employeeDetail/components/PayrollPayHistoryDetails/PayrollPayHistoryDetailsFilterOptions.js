import {
  FieldGroup, FormHorizontal, Icons, Select, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../../selectors/PayrollPayHistorySelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './PayrollPayHistoryDetailsFilterOptions.module.css';

const fieldGroupLabel = (
  <div>
    <span>Employee pay history&nbsp;</span>
    <Tooltip triggerContent={<Icons.Info />} placement="right">
      If you started processing pays half way through the payroll year,
      enter the employee&#39;s pay history for the periods prior to the first recorded pay.
    </Tooltip>
  </div>
);

const PayrollPayHistoryDetailsFilterOptions = ({
  period,
  payHistoryPeriodOptions = [],
  onChange,
}) => (
  <div className={styles.formWidth}>
    <FormHorizontal>
      <FieldGroup label={fieldGroupLabel}>
        <Select name="period" label="Pay history for" value={period} onChange={handleSelectChange(onChange)}>
          <Select.Option value="placeholder" label="Please select an option" disabled />
          {
            payHistoryPeriodOptions.map(({ name, value }) => (
              <Select.Option value={value} label={name} key={value} />
            ))
          }
        </Select>
      </FieldGroup>
    </FormHorizontal>
  </div>
);

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(PayrollPayHistoryDetailsFilterOptions);
