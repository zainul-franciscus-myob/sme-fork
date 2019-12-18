import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableEntries } from '../EmployeeListSelectors';

const EmployeeListTableBody = (props) => {
  const { tableConfig, entries } = props;

  const rows = entries.map(entry => (
    <Table.Row key={entry.id} isInactive={entry.isInactive}>
      <Table.RowItem {...tableConfig.name}>
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.phoneNumber}>
        {entry.phone}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.email}>
        {entry.email}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

EmployeeListTableBody.propTypes = {
  tableConfig: PropTypes.shape().isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(EmployeeListTableBody);
