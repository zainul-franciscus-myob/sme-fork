import { PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDefaultFilters, getIsTableEmpty, getIsTableLoading,
} from '../selectors/SupplierReturnListSelectors';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import NoResultStateIcon from '../../../../components/Icon/NoResultStateIcon';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import SupplierReturnListTableBody from './SupplierReturnListTableBody';

const SupplierReturnListTable = ({
  tableConfig,
  isTableLoading,
  isTableEmpty,
  isDefaultFilters,
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

  return (
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      emptyMessage="There are no supplier returns for the selected filter options."
    >
      <SupplierReturnListTableBody
        tableConfig={tableConfig}
        onCreateRefundClick={onCreateRefundClick}
        onCreatePurchaseClick={onCreatePurchaseClick}
      />
    </StickyTableBody>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilters: getIsDefaultFilters(state),
});

export default connect(mapStateToProps)(SupplierReturnListTable);
