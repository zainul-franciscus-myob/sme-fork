import { Card, Field } from '@myob/myob-widgets';
import React from 'react';

import formatDate from '../../../../../common/valueFormatters/formatDate/formatDate';
import styles from './JobMakerHeader.module.css';

const JobMakerHeader = ({ currentPayrollYearLabel, currentPeriodDetails }) => {
  const dateFormat = 'dd/MM/yyyy';
  const cardBody = (
    <>
      <Field
        testid="JM-payroll-year-current"
        label="Payroll year"
        renderField={() => (
          <React.Fragment>{currentPayrollYearLabel}</React.Fragment>
        )}
      />

      <span className={styles.divider} />
      <Field
        testid="JM-period-header-current"
        label="Current JobMaker claim period"
        renderField={() => (
          <React.Fragment>
            Period {currentPeriodDetails.period}&nbsp;&nbsp;
            {formatDate(currentPeriodDetails.periodStart, dateFormat)} -&nbsp;
            {formatDate(currentPeriodDetails.periodEnd, dateFormat)}
          </React.Fragment>
        )}
      />
    </>
  );

  return <Card body={<Card.Body child={cardBody} classes={[styles.flex]} />} />;
};

export default JobMakerHeader;
