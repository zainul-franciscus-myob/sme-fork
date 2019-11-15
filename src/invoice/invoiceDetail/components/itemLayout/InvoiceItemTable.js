import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getItemLayoutTable,
} from '../../selectors/itemLayoutSelectors';
import { getTaxCodeLabel } from '../../selectors/invoiceDetailSelectors';
import InvoiceDetailTotals from '../InvoiceDetailTotals';
import InvoiceItemTableRow from './InvoiceItemTableRow';

const InvoiceItemTable = ({
  invoiceLines,
  listeners: {
    onAddTableLine,
    onChangeTableRow,
    onRemoveTableRow,
    onLineInputBlur,
    onChangeAmountToPay,
    onAddItemButtonClick,
  },
  taxCodeLabel,
}) => {
  const itemIdLabel = 'Item id';
  const itemNameLabel = 'Item name';
  const unitLabel = 'Units';
  const unitPriceLabel = 'Unit Price';
  const discountLabel = 'Discount (%)';
  const amountLabel = 'Amount ($)';
  const requiredLabel = 'This is required';

  const headerItems = [
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {itemIdLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{itemNameLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {unitPriceLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{discountLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {amountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {taxCodeLabel}
    </LineItemTable.HeaderItem>,
  ];

  const labels = [
    itemIdLabel,
    itemNameLabel,
    unitLabel,
    unitPriceLabel,
    discountLabel,
    amountLabel,
    taxCodeLabel,
  ];

  const columnConfig = [
    {
      config: [
        {
          columnName: itemIdLabel,
          styles: { width: '16.8rem' },
        },
        {
          columnName: unitLabel,
          styles: { width: '10rem' },
        },
        {
          columnName: unitPriceLabel,
          styles: { width: '12.8rem' },
        },
        {
          columnName: discountLabel,
          styles: { width: '10rem' },
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

  const renderRow = (index, data, onChange) => (
    <InvoiceItemTableRow
      index={index}
      key={index}
      onChange={onChange}
      onLineInputBlur={onLineInputBlur}
      onAddItemButtonClick={onAddItemButtonClick}
      labels={labels}
    />
  );

  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow}
      data={invoiceLines}
      onAddRow={onAddTableLine}
      onRowChange={onChangeTableRow}
      onRemoveRow={onRemoveTableRow}
    >
      <InvoiceDetailTotals onChange={onChangeAmountToPay} />
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  invoiceLines: getItemLayoutTable(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(InvoiceItemTable);
