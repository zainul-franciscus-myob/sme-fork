import { Label, Table } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getShowHiddenColumns, getTableEntries } from '../contactListSelector';

const inActiveRow = ({ tableConfig, entry }) => (
  <Table.RowItem {...tableConfig.isActive}>
    {!entry.isActive && (<Label type="boxed" color="light-grey" size="small">Inactive</Label>)}
  </Table.RowItem>
);

const ContactListTableBody = (props) => {
  const {
    tableConfig,
    entries,
    showHiddenColumns,
  } = props;

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.name}>
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      { showHiddenColumns ? inActiveRow({ tableConfig, entry }) : undefined }
      <Table.RowItem {...tableConfig.referenceId}>{entry.referenceId}</Table.RowItem>
      <Table.RowItem {...tableConfig.type}>{entry.type}</Table.RowItem>
      <Table.RowItem {...tableConfig.phoneNumber}>{entry.phoneNumber}</Table.RowItem>
      <Table.RowItem {...tableConfig.email}>{entry.email}</Table.RowItem>
      <Table.RowItem {...tableConfig.outstandingBalance}>
        {entry.outstandingBalance}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.overdue}>{entry.overdue}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
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
