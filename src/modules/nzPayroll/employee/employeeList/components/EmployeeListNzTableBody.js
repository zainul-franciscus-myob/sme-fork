import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeList } from '../EmployeeListNzSelector';

const EmployeeListNZTableBody = (props) => {
  const { entries, tableConfig } = props;

  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.name}>
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.phoneNumber}>{entry.phone}</Table.RowItem>
      <Table.RowItem {...tableConfig.email}>{entry.email}</Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getEmployeeList(state),
});

export default connect(mapStateToProps)(EmployeeListNZTableBody);
