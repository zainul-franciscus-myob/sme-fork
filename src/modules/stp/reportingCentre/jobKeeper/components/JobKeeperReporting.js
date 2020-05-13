import { Button, Icons, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import styles from './JobKeeperFilter.module.css';

class JobKeeperReporting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: 0,
    };
  }

  render() {
    const {
      props: {
        onOpenJobKeeperReport,
      },
      state: {
        selectedMonth,
      },
    } = this;

    const items = [
      { label: 'April (fortnights 1 & 2)', month: '4' },
      { label: 'May (fortnights 3 & 4)', month: '5' },
      { label: 'June (fortnights 5 & 6)', month: '6' },
      { label: 'July (fortnights 7 & 8)', month: '7' },
      { label: 'August (fortnights 9, 10 & 11)', month: '8' },
      { label: 'September (fortnights 12 & 13)', month: '9' },
    ];

    return (
      <div className={styles['jobkeeper-reporting']} testid="jobKeeperReportsPanel">
          <Select
            label="Month"
            name="reportingMonth"
            onChange={handleSelectChange(e => { this.setState({ selectedMonth: e.value }); })}
          >
            { items.map(item => <Select.Option
              label={item.label}
              value={item.month}
              key={item.month}
            />) }
          </Select>
          <Button
            id="job-keeper-reports-btn"
            onClick={() => onOpenJobKeeperReport(selectedMonth)}
            type="link"
            icon={<Icons.GenericDocument />}
            className={styles['jobkeeper-reporting-btn']}
          >View JobKeeper summary (PDF)</Button>
      </div>
    );
  }
}

export default JobKeeperReporting;
