import { Label, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import Table from '@myob/myob-widgets/lib/components/Table/Table';

import {
  getBillEntries,
  getEmptyViewType,
  getIsTableEmpty,
  getIsTableLoading,
  getShouldDisableFields,
  getTotalAmount,
} from '../BillPaymentDetailSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TableView from '../../../../components/TableView/TableView';
import styles from './BillPaymentDetailTable.module.css';
import tableViewTypes from '../tableViewTypes';

const onInputFieldChange = (handler, index) => ({ target: { name: key, rawValue: value } }) => (
  handler({ key, value, index })
);

const BillPaymentDetailTable = ({
  entries,
  totalAmount,
  emptyViewType,
  onUpdateTableInputField,
  shouldDisableFields,
  isTableEmpty,
  isTableLoading,
}) => {
  const emptyView = emptyViewType === tableViewTypes.emptySupplier
    ? <PageState title="Select the supplier you paid" description="You'll see their bills here" />
    : <PageState title="There are no bills" />;

  const tableConfig = {
    date: { columnName: 'Issue date', valign: 'middle' },
    billNumber: { columnName: 'Bill number', valign: 'middle' },
    status: { columnName: 'Status', valign: 'middle' },
    billAmount: { columnName: 'Balance due ($)', valign: 'middle', align: 'right' },
    discountAmount: { columnName: 'Discount ($)', valign: 'middle', align: 'right' },
    balanceOwed: { columnName: 'Discounted balance ($)', valign: 'middle', align: 'right' },
    paidAmount: { columnName: 'Amount paid ($)', valign: 'middle', align: 'right' },
  };

  const responsiveWidth = [
    {
      'min-width': '1100px',
      config: [
        { columnName: tableConfig.date.columnName, styles: { width: '11rem' } },
        { columnName: tableConfig.billNumber.columnName, styles: { width: 'flex-1' } },
        { columnName: tableConfig.status.columnName, styles: { width: '11rem' } },
        { columnName: tableConfig.billAmount.columnName, styles: { width: '16.8rem' } },
        { columnName: tableConfig.discountAmount.columnName, styles: { width: '16.8rem' } },
        { columnName: tableConfig.balanceOwed.columnName, styles: { width: '20rem' } },
        { columnName: tableConfig.paidAmount.columnName, styles: { width: '16.8rem' } },
      ],
    },
  ];

  const tableBody = (
    <React.Fragment>
      <Table.Body>
        {entries.map((row, index) => (
          <Table.Row key={row.id}>
            <Table.RowItem {...tableConfig.date}>{row.date}</Table.RowItem>
            <Table.RowItem {...tableConfig.billNumber}>
              <a href={row.link} target="_blank" rel="noopener noreferrer">{row.billNumber}</a>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.status}>
              <Label color={row.labelColour} type="boxed">
                {row.status}
              </Label>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.billAmount}>{row.billAmount}</Table.RowItem>
            <Table.RowItem {...tableConfig.discountAmount}>
              <AmountInput
                disabled={shouldDisableFields}
                textAlign="right"
                name="discountAmount"
                value={row.discountAmount}
                onChange={onInputFieldChange(onUpdateTableInputField, index)}
                onBlur={onInputFieldChange(onUpdateTableInputField, index)}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
                label="discountAmount"
                hideLabel
                numeralPositiveOnly
              />
            </Table.RowItem>
            <Table.RowItem {...tableConfig.balanceOwed}>{row.balanceOwed}</Table.RowItem>
            <Table.RowItem {...tableConfig.paidAmount}>
              <AmountInput
                disabled={shouldDisableFields}
                textAlign="right"
                name="paidAmount"
                value={row.paidAmount}
                onChange={onInputFieldChange(onUpdateTableInputField, index)}
                onBlur={onInputFieldChange(onUpdateTableInputField, index)}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
                label="paidAmount"
                hideLabel
              />
            </Table.RowItem>
          </Table.Row>
        ))}
      </Table.Body>
      <div className={styles.totalPaid}>
        <span>Total amount paid</span>
        <span>{totalAmount}</span>
      </div>
    </React.Fragment>
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        {tableConfig.date.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.billNumber}>
        {tableConfig.billNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        {tableConfig.status.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.billAmount}>
        {tableConfig.billAmount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.discountAmount}>
        {tableConfig.discountAmount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.balanceOwed}>
        {tableConfig.balanceOwed.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.paidAmount}>
        {tableConfig.paidAmount.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      responsiveWidths={responsiveWidth}
    >
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = state => ({
  entries: getBillEntries(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  shouldDisableFields: getShouldDisableFields(state),
  emptyViewType: getEmptyViewType(state),
  totalAmount: getTotalAmount(state),
});

export default connect(mapStateToProps)(BillPaymentDetailTable);
