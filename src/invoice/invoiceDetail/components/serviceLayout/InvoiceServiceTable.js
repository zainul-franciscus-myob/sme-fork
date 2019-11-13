import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData } from '../../selectors/serviceLayoutSelectors';
import { getTaxCodeLabel } from '../../selectors/invoiceDetailSelectors';
import InvoiceDetailTotals from '../InvoiceDetailTotals';
import InvoiceServiceTableRow from './InvoiceServiceTableRow';

const InvoiceServiceTable = ({
  tableData,
  taxCodeLabel,
  listeners: {
    onUpdateRow,
    onAddRow,
    onRowInputBlur,
    onRemoveRow,
    onChangeAmountToPay,
  },
}) => {
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const amountLabel = 'Amount ($)';
  const requiredLabel = 'This is required';

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
          styles: { width: '12.8rem' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '9rem' },
        },
      ],
    },
  ];

  const labels = [descriptionLabel, accountLabel, amountLabel, taxCodeLabel];

  const onRowChange = handler => (index, key, value) => handler({ index, key, value });

  const onTableAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

  const onAmountInputFieldChange = handler => e => (
    handler({
      target: {
        name: e.target.name,
        value: e.target.rawValue,
      },
    })
  );

  const renderRow = onRowInputBlurHandler => (index, data, onChange) => (
    <InvoiceServiceTableRow
      index={index}
      key={index}
      onChange={onChange}
      onComboboxChange={onChange}
      onAmountInputFieldChange={onAmountInputFieldChange(onChange)}
      onRowInputBlur={() => onRowInputBlurHandler(index)}
      labels={labels}
    />
  );

  const onTableRemoveRow = handler => index => handler(index);
  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow(onRowInputBlur)}
      data={tableData}
      onAddRow={onTableAddRow(onAddRow)}
      onRowChange={onRowChange(onUpdateRow)}
      onRemoveRow={onTableRemoveRow(onRemoveRow)}
    >
      <InvoiceDetailTotals onChange={onChangeAmountToPay} />
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(InvoiceServiceTable);
