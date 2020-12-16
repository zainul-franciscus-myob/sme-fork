import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getChildrenTaxCodes } from '../taxDetailSelectors';

const TaxDetailTable = ({ childrenTaxCodes }) => {
  const rows = childrenTaxCodes?.map((entry) => (
    <Table.Row>
      <Table.RowItem columnName="Code">{entry.code}</Table.RowItem>
      <Table.RowItem columnName="Description">
        {entry.description}
      </Table.RowItem>
      <Table.RowItem columnName="Rate">{entry.rate}</Table.RowItem>
    </Table.Row>
  ));

  const table = (
    <Table>
      <Table.Header>
        <Table.HeaderItem>Code</Table.HeaderItem>
        <Table.HeaderItem>Description</Table.HeaderItem>
        <Table.HeaderItem>Rate (%)</Table.HeaderItem>
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table>
  );

  return childrenTaxCodes ? table : null;
};

const mapStateToProps = (state) => ({
  childrenTaxCodes: getChildrenTaxCodes(state),
});

export default connect(mapStateToProps)(TaxDetailTable);
