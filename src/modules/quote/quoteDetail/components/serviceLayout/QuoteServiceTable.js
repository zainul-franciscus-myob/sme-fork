import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData, getTaxCodeLabel } from '../../selectors/QuoteDetailSelectors';
import QuoteServiceTableRow from './QuoteServiceTableRow';

const descriptionLabel = 'Description';
const accountLabel = 'Account';
const amountLabel = 'Amount ($)';
const requiredLabel = 'Required';

const onTableAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const onTableRemoveRow = handler => index => handler(index);

const QuoteServiceTable = ({
  footer,
  tableData,
  listeners: {
    onUpdateRow,
    onAddRow,
    onRemoveRow,
    onRowInputBlur,
    onAddAccountButtonClick,
  },
  taxCodeLabel,
}) => {
  const headerItems = [
    <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem
      requiredLabel={requiredLabel}
    >
      {accountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem
      requiredLabel={requiredLabel}
    >
      {amountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem
      requiredLabel={requiredLabel}
    >
      {taxCodeLabel}
    </LineItemTable.HeaderItem>,
  ];

  const columnConfig = [
    {
      config: [
        {
          columnName: accountLabel,
          styles: { width: '35.2rem' },
        },
        {
          columnName: amountLabel,
          styles: { width: '12.4rem', align: 'right' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '8.4rem' },
        },
      ],
    },
  ];

  const labels = [descriptionLabel, accountLabel, amountLabel, taxCodeLabel];

  const renderRow = (index, _, onChange) => (
    <QuoteServiceTableRow
      index={index}
      key={index}
      onChange={onChange}
      onAddAccount={onAddAccountButtonClick}
      onRowInputBlur={onRowInputBlur}
      labels={labels}
    />
  );

  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow}
      data={tableData}
      onAddRow={onTableAddRow(onAddRow)}
      onRowChange={onUpdateRow}
      onRemoveRow={onTableRemoveRow(onRemoveRow)}
    >
      {footer}
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(QuoteServiceTable);
