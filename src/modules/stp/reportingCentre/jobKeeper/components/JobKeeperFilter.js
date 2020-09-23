import { Card, Field, Select } from '@myob/myob-widgets';
import React from 'react';

import JobKeeperReporting from './JobKeeperReporting';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import styles from './JobKeeperFilter.module.css';

const JobKeeperFilter = ({
  currentPayrollYearLabel,
  payrollYears,
  payrollYear,
  onPayrollYearChange,
  onOpenJobKeeperReport,
  featureToggles,
  onOpenEmployeeBenefitReport,
}) => {
  const payrollYearChangeHandler = ({ value }) => {
    onPayrollYearChange(value);
  };

  const cardBody = (
    <>
      {featureToggles?.isJobKeeper2Enabled ? (
        <Field
          testId="JK2-payroll-year-current-fixed"
          label="Payroll year"
          renderField={() => (
            <React.Fragment>{currentPayrollYearLabel}</React.Fragment>
          )}
        />
      ) : (
        <Select
          testId="JK1-payroll-year-selector"
          label="Payroll year"
          name="payrollYear"
          value={payrollYear}
          onChange={handleSelectChange(payrollYearChangeHandler)}
          width="sm"
        >
          {payrollYears.map(({ year, label }) => (
            <Select.Option value={year} label={label} key={year} />
          ))}
        </Select>
      )}
      {featureToggles && featureToggles.isJobKeeperReportingEnabled ? (
        <>
          <span className={styles.divider} />
          <JobKeeperReporting
            onOpenJobKeeperReport={onOpenJobKeeperReport}
            featureToggles={featureToggles}
            onOpenEmployeeBenefitReport={onOpenEmployeeBenefitReport}
          />
        </>
      ) : null}
    </>
  );

  return <Card body={<Card.Body child={cardBody} classes={[styles.flex]} />} />;
};

export default JobKeeperFilter;
