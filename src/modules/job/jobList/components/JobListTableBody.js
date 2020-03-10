import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getShowStatusColumn, getTableEntries } from '../jobListSelector';

const inActiveRow = ({ tableConfig, entry }) => (
  <Table.RowItem
    columnName={tableConfig.isActive.columnName}
    {...tableConfig.isActive.style}
  >
    {!entry.isActive && (
      <Label type="boxed" color="light-grey" size="small">
        Inactive
      </Label>
    )}
  </Table.RowItem>
);

const JobListTableBody = (props) => {
  const { tableConfig, entries, showStatusColumn } = props;

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem
        columnName={tableConfig.number.columnName}
        {...tableConfig.number.style}
      >
        {entry.number}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.name.columnName}
        {...tableConfig.name.style}
      >
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      {showStatusColumn ? inActiveRow({ tableConfig, entry }) : undefined}
      <Table.RowItem
        columnName={tableConfig.income.columnName}
        {...tableConfig.income.style}
      >
        {entry.income}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.cost.columnName}
        {...tableConfig.cost.style}
      >
        {entry.cost}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.expenses.columnName}
        {...tableConfig.expenses.style}
      >
        {entry.expenses}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.netProfit.columnName}
        {...tableConfig.netProfit.style}
      >
        {entry.netProfit}
      </Table.RowItem>
    </Table.Row>
  ));

  return <React.Fragment>{rows}</React.Fragment>;
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
  showStatusColumn: getShowStatusColumn(state),
});

export default connect(mapStateToProps)(JobListTableBody);
