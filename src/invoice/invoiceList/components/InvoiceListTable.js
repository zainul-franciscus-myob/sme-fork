import { Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDefaultFilters, getIsTableEmpty, getIsTableLoading } from '../invoiceListSelectors';
import InvoiceListTableBody from './InvoiceListTableBody';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import StickyTableBody from '../../../components/StickyTable/StickyTableBody';

const InvoiceListTable = ({
  isTableLoading,
  isTableEmpty,
  isDefaultFilter,
  tableConfig,
  onCreateButtonClick,
}) => {
  const emptyTableView = isDefaultFilter ? (
    <NoResultPageState
      title="No invoices"
      description="Create invoices to track the sales you make and how much customers owe you"
      actions={[
        <Button
          key={1}
          onClick={onCreateButtonClick}
          type="link"
          icon={<Icons.Add />}
        >
          Create invoice
        </Button>,
      ]}
    />
  ) : (
    <NoResultPageState
      title="No results found :("
      description="Is the date range correct? Try different filters to find the invoice you're looking for"
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
