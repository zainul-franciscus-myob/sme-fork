import { PropTypes } from 'prop-types';
import { Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../invoiceListSelectors';
import InvoiceListTableBody from './InvoiceListTableBody';
import InvoiceListTableHeader from './InvoiceListTableHeader';
import style from './InvoiceListView.css';

const tableConfig = {
  dateIssued: { width: '12rem', valign: 'top', align: 'right' },
  number: { width: '15rem', valign: 'top' },
  customer: { width: 'flex-1', valign: 'top' },
  purchaseOrder: { width: '16rem', valign: 'top' },
  invoiceAmount: { width: '16rem', valign: 'top', align: 'right' },
  invoiceDue: { width: '15rem', valign: 'top', align: 'right' },
  dateDue: { width: '12rem', valign: 'top', align: 'right' },
  status: { width: '10rem', valign: 'middle', align: 'left' },
};

const emptyView = (
  <div className={style.empty}>
    There are no invoices for the selected filter options.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const InvoiceListTable = ({
  onSort,
  isTableLoading,
  isTableEmpty,
}) => {
  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (<InvoiceListTableBody tableConfig={tableConfig} />);
  }
  return (
    <Table>
      <InvoiceListTableHeader tableConfig={tableConfig} onSort={onSort} />
      {view}
    </Table>
  );
};

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
