import { PropTypes } from 'prop-types';
import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEntries } from '../SpendMoneyListSelectors';

/* eslint-disable react/no-array-index-key */

const SpendMoneyTableBody = (props) => {
  const {
    businessId,
    tableConfig,
    entries,
  } = props;

  const rows = entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        <a href={`/#/${businessId}/spendMoney/${entry.id}`}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>{entry.description}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount}>{entry.displayAmount}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

SpendMoneyTableBody.propTypes = {
  businessId: PropTypes.string.isRequired,
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  entries: getEntries(state),
});

export default connect(mapStateToProps)(SpendMoneyTableBody);
