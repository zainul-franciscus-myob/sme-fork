import {
  FieldGroup, Icons, MonthPicker, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessDetailSelectors';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';
import handleMonthPickerChange from '../../../components/handlers/handleMonthPickerChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './FinancialYearSection.module.css';

const FinancialYearSection = ({
  financialYear,
  lastMonthInFinancialYear,
  openingBalanceDate,
  onChange,
}) => (
  <FieldGroup label="Financial year">
    <YearSelect
      className={styles.fiscalYear}
      name="financialYear"
      label="Current financial year"
      value={financialYear}
      onChange={handleSelectChange(onChange)}
    />
    <MonthSelect
      className={styles.lastMonthInFiscalYear}
      name="lastMonthInFinancialYear"
      label="Last month in financial year"
      value={lastMonthInFinancialYear}
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          Make sure to discuss this with your advisor before changing the
          financial year period.
        </Tooltip>
      )}
      onChange={handleSelectChange(onChange)}
    />
    <MonthPicker
      name="openingBalanceDate"
      label="Opening balance month"
      value={openingBalanceDate}
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          The date you either started using MYOB or the start of a period,
          like a new financial year.
        </Tooltip>
      )}
      onSelect={handleMonthPickerChange(onChange, 'openingBalanceDate')}
    />
  </FieldGroup>
);

const mapStateToProps = state => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
