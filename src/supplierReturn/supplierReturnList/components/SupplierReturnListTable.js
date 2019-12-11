import { PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDefaultFilters, getIsTableEmpty, getIsTableLoading,
} from '../selectors/SupplierReturnListSelectors';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import NoResultStateIcon from '../../../components/Icon/NoResultStateIcon';
import SupplierReturnListTableBody from './SupplierReturnListTableBody';
import SupplierReturnListTableHeader from './SupplierReturnListTableHeader';
import TableView from '../../../components/TableView/TableView';

const date = 'Issue date';
const purchaseOrderNumber = 'Bill number';
const supplier = 'Supplier';
const supplierInvoiceNumber = 'Supplier invoice no';
const amount = 'Amount ($)';
const balanceDue = 'Balance due ($)';
const receiveRefund = 'Record refund';
const applyToPurchase = 'Apply to purchase';

const responsiveWidths = [
  {
    'min-width': '768px',
    config: [
      { columnName: date, styles: { width: 'flex-1' } },
      { columnName: purchaseOrderNumber, styles: { width: 'flex-1' } },
      { columnName: supplier, styles: { width: 'flex-1' } },
      { columnName: supplierInvoiceNumber, styles: { width: 'flex-1' } },
      { columnName: amount, styles: { width: '12rem' } },
      { columnName: balanceDue, styles: { width: '12rem' } },
      { columnName: receiveRefund, styles: { width: 'flex-1' } },
      { columnName: applyToPurchase, styles: { width: 'flex-1' } },
    ],
  },
  {
    'min-width': '1200px',
    config: [
      { columnName: date, styles: { width: '11.5rem' } },
      { columnName: purchaseOrderNumber, styles: { width: '12rem' } },
      { columnName: supplier, styles: { width: 'flex-1' } },
      { columnName: supplierInvoiceNumber, styles: { width: '17rem' } },
      { columnName: amount, styles: { width: '13.5rem' } },
      { columnName: balanceDue, styles: { width: '16rem' } },
      { columnName: receiveRefund, styles: { width: '13rem' } },
      { columnName: applyToPurchase, styles: { width: '16rem' } },
    ],
  },
];

const tableConfig = {
  date: { columnName: date, styles: { valign: 'middle' } },
  purchaseOrderNumber: { columnName: purchaseOrderNumber, styles: { valign: 'middle' } },
  supplier: { columnName: supplier, styles: { valign: 'middle' } },
  supplierInvoiceNumber: { columnName: supplierInvoiceNumber, styles: { valign: 'middle' } },
  amount: { columnName: amount, styles: { valign: 'middle', align: 'right' } },
  balanceDue: { columnName: balanceDue, styles: { valign: 'middle', align: 'right' } },
  receiveRefund: { columnName: receiveRefund, styles: { valign: 'middle' } },
  applyToPurchase: { columnName: applyToPurchase, styles: { valign: 'middle' } },
};

const SupplierReturnListTable = ({
  isTableLoading,
  isTableEmpty,
  isDefaultFilters,
  onSort,
  onCreateRefundClick,
  onCreatePurchaseClick,
}) => {
  const image = <NoResultStateIcon />;
  const emptyView = isDefaultFilters ? (
    <NoResultPageState
      title="No supplier returns yet"
      description="To process a supplier return, you first need to record a debit transaction
        and then record the settlement of the debit."
    />
  ) : (
    <PageState
      title="No results found"
      description="Try different filters to find what you're looking for."
      image={image}
    />
  );

  const header = <SupplierReturnListTableHeader tableConfig={tableConfig} onSort={onSort} />;

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      header={header}
      responsiveWidths={responsiveWidths}
      emptyMessage="There are no supplier returns for the selected filter options."
    >
      <SupplierReturnListTableBody
        tableConfig={tableConfig}
        onCreateRefundClick={onCreateRefundClick}
        onCreatePurchaseClick={onCreatePurchaseClick}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilters: getIsDefaultFilters(state),
});

export default connect(mapStateToProps)(SupplierReturnListTable);
