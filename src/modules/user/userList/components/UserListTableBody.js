import { Badge, Table } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../userListSelectors';

const UserListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;

  const rows = entries.map(({
    id, link, name, advisor, email, status,
  }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>
        <a href={link}>{name}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.advisor}>{advisor}</Table.RowItem>
      <Table.RowItem {...tableConfig.email}>{email}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <Badge color="light-grey">{status}</Badge>
      </Table.RowItem>
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
