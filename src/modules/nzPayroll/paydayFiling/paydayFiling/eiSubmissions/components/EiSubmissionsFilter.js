import { Button, Card, RefreshIcon, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';
import styles from './EiSubmissionsView.module.css';

const EiSubmissionsFilter = ({
  payrollYears,
  selectedPayrollYear,
  onPayrollYearChange,
  onRefreshClick,
}) => {
  const payrollYearChangeHandler = ({ value }) => {
    onPayrollYearChange(value);
  };

  const cardBody = (
    <>
      <div className={styles.flexItems}>
        <Select
          label="Payroll year"
          name="payrollYear"
          value={selectedPayrollYear}
          onChange={handleSelectChange(payrollYearChangeHandler)}
          width="sm"
        >
          {payrollYears.map(({ year, label }) => (
            <Select.Option value={year} label={label} key={year} />
          ))}
        </Select>
        <p className={styles.text}>
          {' '}
          Recent submissions can take a few minutes to show in payday filing.
        </p>
      </div>
      <div className={styles.flexItems}>
        <Button
          type="link"
          icon={<RefreshIcon />}
          onClick={onRefreshClick}
          testid="refreshButton"
        >
          Check for updates
        </Button>
      </div>
    </>
  );

  return <Card body={<Card.Body child={cardBody} classes={[styles.flex]} />} />;
};

export default EiSubmissionsFilter;
