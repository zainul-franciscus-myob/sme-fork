import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDefaultFilters, getIsTableEmpty, getIsTableLoading } from '../invoiceListSelectors';
import InvoiceListTableBody from './InvoiceListTableBody';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import StickyTableBody from '../../../components/StickyTable/StickyTableBody';
import emptyImage from './empty.svg';

const InvoiceListTable = ({
  isTableLoading,
  isTableEmpty,
  isDefaultFilter,
  tableConfig,
  onCreateInvoiceButtonClick,
}) => {
  const emptyTableView = isDefaultFilter ? (
    <NoResultPageState
      title="Your first invoice awaits"
      description="Tracks the sales you make and how much customers owe you with invoices."
      actions={[
        <Button
          key={1}
          onClick={onCreateInvoiceButtonClick}
          type="link"
          icon={<Icons.Add />}
        >
          Create invoice
        </Button>,
      ]}
    />
  ) : (
    <PageState
      title="No invoices found"
      description="Perhaps check the dates or remove the filters and try again."
      image={(<img src={emptyImage} alt="No invoices found" />)}
    />
  );

  return (
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyTableView}
    >
      <InvoiceListTableBody tableConfig={tableConfig} />
    </StickyTableBody>
  );
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  isDefaultFilter: getIsDefaultFilters(state),
});

export default connect(mapStateToProps)(InvoiceListTable);
