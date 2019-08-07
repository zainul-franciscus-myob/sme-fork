import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../invoiceListSelectors';
import InvoiceListTableBody from './InvoiceListTableBody';
import InvoiceListTableHeader from './InvoiceListTableHeader';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  dateIssued: { width: '12rem', valign: 'top', align: 'right' },
  number: { width: '15rem', valign: 'top' },
  customer: { width: 'flex-1', valign: 'top' },
  purchaseOrder: { width: '16rem', valign: 'top' },
  invoiceAmount: { width: '16rem', valign: 'top', align: 'right' },
  invoiceDue: { width: '15rem', valign: 'top', align: 'right' },
  dateDue: { width: '12rem', valign: 'top', align: 'left' },
  status: { width: '10rem', valign: 'middle', align: 'left' },
};

const InvoiceListTable = ({
  onSort,
  isTableLoading,
  isTableEmpty,
}) => (
  <TableView
    header={<InvoiceListTableHeader tableConfig={tableConfig} onSort={onSort} />}
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyMessage="There are no invoices for the selected filter options."
  >
    <InvoiceListTableBody tableConfig={tableConfig} />
  </TableView>
);

InvoiceListTable.propTypes = {
  onSort: PropTypes.func.isRequired,
  isTableLoading: PropTypes.bool.isRequired,
  isTableEmpty: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(InvoiceListTable);
