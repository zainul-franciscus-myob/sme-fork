import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableHeaderTexts } from '../taxListSelectors';
import TaxListTableBody from './TaxListTableBody';

const tableConfig = {
  taxCode: { width: '10rem' },
  description: { width: '20rem' },
  type: { width: '20rem' },
  collectedAccountName: { width: 'flex-1' },
  paidAccountName: { width: 'flex-1' },
  rate: { width: '10rem', align: 'right' },
};

const TaxListTable = ({ tableHeaderTexts }) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.taxCode}>
        {tableHeaderTexts.taxCode}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        Description
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.collectedAccountName}>
        {tableHeaderTexts.collectedAccountName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.paidAccountName}>
        {tableHeaderTexts.paidAccountName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.rate}>Rate (%)</Table.HeaderItem>
    </Table.Header>
    <TaxListTableBody tableConfig={tableConfig} />
  </Table>
);

const mapStateToProps = (state) => ({
  tableHeaderTexts: getTableHeaderTexts(state),
});

export default connect(mapStateToProps)(TaxListTable);
