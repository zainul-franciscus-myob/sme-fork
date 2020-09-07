import { Button, Icons, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import styles from './JobKeeperFilter.module.css';

class JobKeeperReporting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: 4,
    };
  }

  render() {
    const {
      props: {
        onOpenJobKeeperReport,
        featureToggles,
        onOpenEmployeeBenefitReport,
      },
      state: { selectedMonth },
    } = this;

    const items = [
      { label: 'April (fortnights 1 & 2)', month: '4' },
      { label: 'May (fortnights 3 & 4)', month: '5' },
      { label: 'June (fortnights 5 & 6)', month: '6' },
      { label: 'July (fortnights 7 & 8)', month: '7' },
      { label: 'August (fortnights 9, 10 & 11)', month: '8' },
      { label: 'September (fortnights 12 & 13)', month: '9' },
    ];

    const itemsJK2 = [
      { label: 'April (fortnights 1 & 2)', month: '4' },
      { label: 'May (fortnights 3 & 4)', month: '5' },
      { label: 'June (fortnights 5 & 6)', month: '6' },
      { label: 'July (fortnights 7 & 8)', month: '7' },
      { label: 'August (fortnights 9, 10 & 11)', month: '8' },
      { label: 'September (fortnights 12 & 13)', month: '9' },
      { label: 'October (fortnights 14 & 15)', month: '10' },
      { label: 'November (fortnights 16 & 17)', month: '11' },
      { label: 'December (fortnights 18 & 19)', month: '12' },
      { label: 'January (fortnights 20, 21 & 22)', month: '1' },
      { label: 'February (fortnights 23 & 24)', month: '2' },
      { label: 'March (fortnights 25 & 26)', month: '3' },
    ];

    return (
      <div
        className={styles['jobkeeper-reporting']}
        testid="jobKeeperReportsPanel"
      >
        <Select
          label="Month"
          name="reportingMonth"
          onChange={handleSelectChange((e) => {
            this.setState({ selectedMonth: e.value });
          })}
        >
          {featureToggles && featureToggles.isJobKeeper2Enabled
            ? itemsJK2.map((item) => (
                <Select.Option
                  label={item.label}
                  value={item.month}
                  key={item.month}
                />
              ))
            : items.map((item) => (
                <Select.Option
                  label={item.label}
                  value={item.month}
                  key={item.month}
                />
              ))}
        </Select>
        <Button
          id="job-keeper-reports-btn"
          testid="job-keeper-reports-btn"
          onClick={() => onOpenJobKeeperReport(selectedMonth)}
          type="link"
          icon={<Icons.GenericDocument />}
          className={styles['jobkeeper-reporting-btn']}
        >
          View JobKeeper summary (PDF)
        </Button>
        {featureToggles && featureToggles.isJobKeeper2Enabled && (
          <Button
            id="employee-benefit-report-btn"
            testid="employee-benefit-report-btn"
            onClick={onOpenEmployeeBenefitReport}
            type="link"
            icon={<Icons.GenericDocument />}
            className={styles['jobkeeper-reporting-btn']}
          >
            View employee benefits report (PDF)
          </Button>
        )}
      </div>
    );
  }
}

export default JobKeeperReporting;
