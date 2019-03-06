import { PropTypes } from 'prop-types';
import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../taxListSelectors';

const TaxListTableBody = ({ tableConfig, entries }) => {
  const rows = entries.map(({
    id, code, description, codeType, collectedAccountName, paidAccountName, rate,
  }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.taxCode}>{code}</Table.RowItem>
      <Table.RowItem {...tableConfig.description}>{description}</Table.RowItem>
      <Table.RowItem {...tableConfig.type}>{codeType}</Table.RowItem>
      <Table.RowItem {...tableConfig.collectedAccountName}>{collectedAccountName}</Table.RowItem>
      <Table.RowItem {...tableConfig.paidAccountName}>{paidAccountName}</Table.RowItem>
      <Table.RowItem {...tableConfig.rate}>{rate}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

TaxListTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(TaxListTableBody);
