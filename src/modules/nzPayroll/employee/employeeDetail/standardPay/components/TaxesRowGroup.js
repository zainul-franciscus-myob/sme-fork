import { Table } from '@myob/myob-widgets';
import React from 'react';

const TaxesRowGroup = ({ tableConfig }) => (
  <>
    <Table.Row key="taxesHeader">
      <Table.RowItem cellRole="heading">Taxes</Table.RowItem>
    </Table.Row>
    <Table.Row key="taxesRow">
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        PAYE Tax
      </Table.RowItem>
      <Table.RowItem {...tableConfig.quantity}></Table.RowItem>
      <Table.RowItem {...tableConfig.rate}></Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>
        <strong>Calculated</strong>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.action}></Table.RowItem>
    </Table.Row>
  </>
);

export default TaxesRowGroup;
