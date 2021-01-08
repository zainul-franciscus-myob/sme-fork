import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeEntries } from '../payRunDetailNzSelector';

const PayRunDetailEmployeesTableBody = ({ entries, tableConfig }) => {
  const rows = entries?.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.employee}>{entry.name}</Table.RowItem>
      <Table.RowItem {...tableConfig.takeHomePay}>
        {entry.takeHomePay}
      </Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getEmployeeEntries(state),
});

export default connect(mapStateToProps)(PayRunDetailEmployeesTableBody);
