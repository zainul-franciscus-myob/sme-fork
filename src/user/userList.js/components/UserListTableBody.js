import { PropTypes } from 'prop-types';
import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../userListSelectors';

const UserListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.name}>
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.email}>{entry.email}</Table.RowItem>
      <Table.RowItem {...tableConfig.advisor}>{entry.advisor}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>{entry.status}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

UserListTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
});

export default connect(mapStateToProps)(UserListTableBody);
