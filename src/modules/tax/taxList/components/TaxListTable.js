import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableHeaderTexts } from '../taxListSelectors';
import TaxListTableBody from './TaxListTableBody';
import widthConfig from './widthConfig';

const tableConfig = {
  taxCode: { columnName: 'Tax code' },
  description: { columnName: 'Description' },
  type: { columnName: 'Type' },
  collectedAccountName: { columnName: 'Account for tax collected' },
  paidAccountName: { columnName: 'Account for tax paid' },
  rate: { align: 'right', columnName: 'Rate (%)' },
};

const responsiveWidthConfig = widthConfig(tableConfig);

const TaxListTable = ({ tableHeaderTexts }) => (
  <Table responsiveWidths={responsiveWidthConfig}>
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
