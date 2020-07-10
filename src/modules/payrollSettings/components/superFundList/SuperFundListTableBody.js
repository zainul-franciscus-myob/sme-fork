import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../../selectors/superFundListSelectors';

const SuperFundListTableBody = (props) => {
  const { tableConfig, entries } = props;

  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.name}>
        <a href={entry.link}>{entry.name}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.fundId}>{entry.fundId}</Table.RowItem>
      <Table.RowItem {...tableConfig.fundName}>{entry.fundName}</Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(SuperFundListTableBody);
