import { Button, Checkbox, DetailHeader } from '@myob/myob-widgets';
import React from 'react';

import PayrollYearFilter from '../../../common/components/PayrollYearFilter';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import styles from './FinalisationView.module.css';

const HeaderField = ({ label, value }) => (
  <div className={styles.finalisationHeaderSecondary}>
    <div className={styles.labels}>{label}</div>
    <div className={styles.values}>{value}</div>
  </div>
);

const FinalisationHeader = ({
  payrollYears,
  payrollYear,
  employeesCount,
  grossPaymentYtd,
  paygWithholdingYtd,
  reportedSection57aRfba,
  reportedRfba,
  onIsRFBAEnabledClick,
  isRFBAEnabled,
  isRFBALocked,
  onPayrollYearChange,
  onVerificationReportClick,
}) => {
  const headerLeft = (
    <>
      <PayrollYearFilter
        payrollYears={payrollYears}
        payrollYear={payrollYear}
        onPayrollYearChange={onPayrollYearChange}
        testid="payrollYearFilter"
      />
      <Button
        testid="verificationReportLink"
        type="link"
        onClick={onVerificationReportClick}
      >
        View YTD verification report (PDF)
      </Button>
    </>
  );

  const headerRight = (
    <div>
      <HeaderField label="Employees" value={employeesCount} />
      <HeaderField label="Gross payments YTD" value={grossPaymentYtd} />
      <HeaderField label="PAYG withholding YTD" value={paygWithholdingYtd} />
      <HeaderField
        label=""
        value={
          <div className={styles.floatLeft}>
            <Checkbox
              name="enableRFBA"
              label="Enable RFBA"
              onChange={handleCheckboxChange(onIsRFBAEnabledClick)}
              checked={isRFBAEnabled}
              disabled={isRFBALocked}
            />
          </div>
        }
      />
      {isRFBAEnabled && (
        <>
          <HeaderField label="Reported RFBA" value={reportedRfba} />
          <HeaderField
            label="Reported Section 57A RFBA"
            value={reportedSection57aRfba}
          />
        </>
      )}
    </div>
  );
  return (
    <DetailHeader
      testid="finalisationHeader"
      primary={headerLeft}
      secondary={headerRight}
      className={styles.options}
    />
  );
};

export default FinalisationHeader;
