import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getTableBodyState,
} from '../purchaseOrderListSelectors';
import Icon from '../../../../components/Icon/Icon';
import PurchaseOrderListTableBody from './PurchaseOrderListTableBody';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import TableBodyType from '../TableBodyType';
import purchaseOrderEmptyStateImage from './purchase-order-empty-state.svg';

const PurchaseOrderListTable = ({
  isTableEmpty,
  isTableLoading,
  tableBodyState,
  onCreateButtonClick,
  tableConfig,
}) => {
  const noResultsPageState = (
    <PageState
      title="No purchase order found"
      description="Perhaps check the dates or remove the filters and try again."
      image={<Icon.NoResultState alt="No purchase order found" />}
    />
  );

  const emptyPageState = (
    <PageState
      title="Create purchase order"
      description="Create a record of the purchase orders you receive from suppliers. You'll be able to keep track of payments and due dates more easily."
      image={
        <img
          src={purchaseOrderEmptyStateImage}
          style={{ width: '25%' }}
          alt="Create purchase order"
        />
      }
      actions={[
        <Button type="link" icon={<Icons.Add />} onClick={onCreateButtonClick}>
          Create purchase order
        </Button>,
      ]}
    />
  );

  const emptyView = {
    [TableBodyType.EMPTY]: emptyPageState,
    [TableBodyType.NO_RESULTS]: noResultsPageState,
  }[tableBodyState];

  return (
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
    >
      <PurchaseOrderListTableBody tableConfig={tableConfig} />
    </StickyTableBody>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  tableBodyState: getTableBodyState(state),
});

export default connect(mapStateToProps)(PurchaseOrderListTable);
