import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
} from '../SupplierReturnPurchaseSelector';
import SupplierReturnPurchaseTableBody from './SupplierReturnPurchaseTableBody';
import SupplierReturnPurchaseTableHeader from './SupplierReturnPurchaseTableHeader';
import TableView from '../../components/TableView/TableView';
import getSupplierReturnPurchaseTableResponsiveConfig from './getSupplierReturnPurchaseTableResponsiveConfig';

const tableConfig = {
  date: { columnName: 'Issue date', valign: 'middle' },
  purchaseNumber: { columnName: 'Bill number', valign: 'middle' },
  status: { columnName: 'Status', valign: 'middle' },
  amount: { columnName: 'Balance due ($)', valign: 'middle', align: 'right' },
  discount: { columnName: 'Discount ($)', valign: 'middle', align: 'right' },
  owed: { columnName: 'Discounted balance ($)', valign: 'middle', align: 'right' },
  amountApplied: { columnName: 'Amount applied ($)', valign: 'middle', align: 'right' },
};

const SupplierReturnPurchaseTable = ({
  isTableEmpty,
  onUpdateTableAmountFields,
  onFormatAmountInput,
}) => {
  const tableBody = (
    <SupplierReturnPurchaseTableBody
      tableConfig={tableConfig}
      onFormatAmountInput={onFormatAmountInput}
      onUpdateTableAmountFields={onUpdateTableAmountFields}
    />
  );

  const header = (
    <SupplierReturnPurchaseTableHeader tableConfig={tableConfig} />
  );

  return (
    <TableView
      responsiveWidths={getSupplierReturnPurchaseTableResponsiveConfig(tableConfig)}
      header={header}
      isEmpty={isTableEmpty}
      emptyMessage="There are no purchases."
    >
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseTable);
