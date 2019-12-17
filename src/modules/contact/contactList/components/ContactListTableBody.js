import { Label, Table } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getShowHiddenColumns, getTableEntries } from '../contactListSelector';

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

const ContactListTableBody = (props) => {
  const { tableConfig, entries, showHiddenColumns } = props;

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem
        columnName={tableConfig.name.columnName}
        {...tableConfig.name.style}
      >
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      {showHiddenColumns ? inActiveRow({ tableConfig, entry }) : undefined}
      <Table.RowItem
        columnName={tableConfig.referenceId.columnName}
        {...tableConfig.referenceId.style}
      >
        {entry.referenceId}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.type.columnName}
        {...tableConfig.type.style}
      >
        {entry.type}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.phoneNumber.columnName}
        {...tableConfig.phoneNumber.style}
      >
        {entry.phoneNumber}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.email.columnName}
        {...tableConfig.email.style}
      >
        {entry.email}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.outstandingBalance.columnName}
        {...tableConfig.outstandingBalance.style}
      >
        {entry.outstandingBalance}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.overdue.columnName}
        {...tableConfig.overdue.style}
      >
        {entry.overdue}
      </Table.RowItem>
    </Table.Row>
  ));

  return <React.Fragment>{rows}</React.Fragment>;
};

ContactListTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showHiddenColumns: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
  showHiddenColumns: getShowHiddenColumns(state),
});

export default connect(mapStateToProps)(ContactListTableBody);
