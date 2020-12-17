import { Input, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodes } from '../selectors/ExportCompanyFileSelectors';
import styles from './TaxCodeMappingTable.module.css';

const handleTaxCodeMappingChange = (handler, id) => (e) => {
  const { value, name } = e.target;
  handler({ id, key: name, value });
};

const tableConfig = {
  taxCode: {
    columnName: 'Tax code',
    width: '9rem',
    valign: 'middle',
  },
  description: {
    columnName: 'Description',
    width: '21rem',
    valign: 'middle',
  },
  incomeMapping: {
    columnName: 'Mapping for tax collected (Income)',
    width: '15rem',
    valign: 'middle',
  },
  expensesMapping: {
    columnName: 'Mapping for tax paid (Expenses)',
    width: '15rem',
    valign: 'middle',
  },
  rate: {
    columnName: 'Rate (%)',
    width: '10rem',
    valign: 'middle',
    align: 'right',
  },
};

const responsiveWidths = [
  {
    'min-width': '768px',
    config: [
      { columnName: tableConfig.taxCode.columnName, styles: { width: '9rem' } },
      {
        columnName: tableConfig.description.columnName,
        styles: { width: '21rem' },
      },
      {
        columnName: tableConfig.incomeMapping.columnName,
        styles: { width: '100%' },
      },
      {
        columnName: tableConfig.expensesMapping.columnName,
        styles: { width: '100%' },
      },
      { columnName: tableConfig.rate.columnName, styles: { width: '10rem' } },
    ],
  },
];

const TaxCodeMappingTable = ({ taxCodes, onChange }) => {
  const tableBodyView = taxCodes.map((mapping) => {
    const {
      id,
      displayName,
      description,
      incomeMapping,
      expensesMapping,
      displayRate,
    } = mapping;

    return (
      <Table.Row key={id}>
        <Table.RowItem {...tableConfig.taxCode}>{displayName}</Table.RowItem>
        <Table.RowItem {...tableConfig.description}>
          {description}
        </Table.RowItem>
        <Table.RowItem
          className={styles.mappingInput}
          {...tableConfig.incomeMapping}
        >
          <Input
            name="incomeMapping"
            value={incomeMapping}
            onChange={handleTaxCodeMappingChange(onChange, id)}
            maxLength={3}
          />
        </Table.RowItem>
        <Table.RowItem
          className={styles.mappingInput}
          {...tableConfig.expensesMapping}
        >
          <Input
            name="expensesMapping"
            value={expensesMapping}
            onChange={handleTaxCodeMappingChange(onChange, id)}
            maxLength={3}
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.rate}>{displayRate}</Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <div>
      <Table hasActions responsiveWidths={responsiveWidths}>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.taxCode}>Tax code</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.description}>
            Description
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.incomeMapping}>
            Mapping for tax collected (Income)
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.expensesMapping}>
            Tax paid mapping (Expenses)
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.rate}>Rate (%)</Table.HeaderItem>
        </Table.Header>
        <Table.Body>{tableBodyView}</Table.Body>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  taxCodes: getTaxCodes(state),
});

export default connect(mapStateToProps)(TaxCodeMappingTable);
