import { Icons, Label, PageState, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getElectronicPaymentReference,
  getElectronicPaymentUrl,
  getEmptyViewType,
  getIsCreating,
  getIsTableEmpty,
  getIsTableLoading,
  getPurchaseEntries,
  getTotalAmount,
} from '../SupplierPaymentDetailSelectors';
import Calculator from '../../../../components/Calculator/Calculator';
import TableView from '../../../../components/TableView/TableView';
import styles from './SupplierPaymentDetailTable.module.css';
import tableViewTypes from '../tableViewTypes';

const onInputFieldChange = (handler, index) => ({
  target: { name: key, rawValue: value },
}) => handler({ key, value, index });

const OverPaidInfoMessage = ({ overAmount }) => (
  <>
    <div>
      This payment will create a&nbsp;
      <b>{overAmount}</b>
      &nbsp;debit.
    </div>
    <br />
    <div>
      Go to <b>Supplier returns</b> to apply the debit to an open bill/order or
      record a refund.
    </div>
  </>
);

const SupplierPaymentDetailTable = ({
  entries,
  totalAmount,
  electronicPaymentUrl,
  electronicPaymentReference,
  emptyViewType,
  onUpdateTableInputField,
  isCreating,
  isTableEmpty,
  isTableLoading,
}) => {
  const emptyView =
    emptyViewType === tableViewTypes.emptySupplier ? (
      <PageState
        title="Select the supplier you paid"
        description="You'll see their purchases here"
      />
    ) : (
      <PageState title="There are no purchases" />
    );

  const tableConfig = {
    date: { columnName: 'Issue date', valign: 'middle' },
    purchaseNumber: { columnName: 'Purchase number', valign: 'middle' },
    status: { columnName: 'Status', valign: 'middle' },
    purchaseAmount: {
      columnName: 'Balance due ($)',
      valign: 'middle',
      align: 'right',
    },
    discountAmount: {
      columnName: 'Discount ($)',
      valign: 'middle',
      align: 'right',
    },
    balanceOwed: {
      columnName: 'Discounted balance ($)',
      valign: 'middle',
      align: 'right',
    },
    paidAmount: {
      columnName: 'Amount paid ($)',
      valign: 'middle',
      align: 'right',
    },
  };

  const responsiveWidth = [
    {
      'min-width': '1100px',
      config: [
        { columnName: tableConfig.date.columnName, styles: { width: '11rem' } },
        {
          columnName: tableConfig.purchaseNumber.columnName,
          styles: { width: 'flex-1' },
        },
        {
          columnName: tableConfig.status.columnName,
          styles: { width: '11rem' },
        },
        {
          columnName: tableConfig.purchaseAmount.columnName,
          styles: { width: '16.8rem' },
        },
        {
          columnName: tableConfig.discountAmount.columnName,
          styles: { width: '16.8rem' },
        },
        {
          columnName: tableConfig.balanceOwed.columnName,
          styles: { width: '20rem' },
        },
        {
          columnName: tableConfig.paidAmount.columnName,
          styles: { width: '16.8rem' },
        },
      ],
    },
  ];

  const tableBody = (
    <>
      <Table.Body>
        {entries.map((row, index) => (
          <Table.Row key={row.id}>
            <Table.RowItem {...tableConfig.date}>{row.date}</Table.RowItem>
            <Table.RowItem {...tableConfig.purchaseNumber}>
              <a href={row.link} target="_blank" rel="noopener noreferrer">
                {row.purchaseNumber}
              </a>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.status}>
              <Label color={row.labelColour} type="boxed">
                {row.status}
              </Label>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.purchaseAmount}>
              {row.purchaseAmount}
            </Table.RowItem>
            <Table.RowItem {...tableConfig.discountAmount}>
              <Calculator
                disabled={!isCreating}
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
            <Table.RowItem {...tableConfig.balanceOwed}>
              {row.balanceOwed}
            </Table.RowItem>
            <Table.RowItem {...tableConfig.paidAmount}>
              <Calculator
                disabled={!isCreating}
                textAlign="right"
                name="paidAmount"
                value={row.paidAmount}
                infoBody={
                  isCreating &&
                  row.overAmount && (
                    <OverPaidInfoMessage overAmount={row.overAmount} />
                  )
                }
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
      {electronicPaymentReference && (
        <p className={styles.electronicPaymentFooter}>
          <Icons.Dollar />
          <span className={styles.successColor}>
            &nbsp;Electronic payment recorded&nbsp;
          </span>
          Reference number&nbsp;
          <span>
            <a href={electronicPaymentUrl}>{electronicPaymentReference}</a>
          </span>
        </p>
      )}
    </>
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        {tableConfig.date.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.purchaseNumber}>
        {tableConfig.purchaseNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        {tableConfig.status.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.purchaseAmount}>
        {tableConfig.purchaseAmount.columnName}
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

const mapStateToProps = (state) => ({
  entries: getPurchaseEntries(state),
  isCreating: getIsCreating(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  emptyViewType: getEmptyViewType(state),
  totalAmount: getTotalAmount(state),
  electronicPaymentUrl: getElectronicPaymentUrl(state),
  electronicPaymentReference: getElectronicPaymentReference(state),
});

export default connect(mapStateToProps)(SupplierPaymentDetailTable);
