import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getTableBodyState,
} from '../purchaseOrderListSelectors';
import Icon from '../../../../components/Icon/Icon';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import PurchaseOrderListTableBody from './PurchaseOrderListTableBody';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import TableBodyType from '../TableBodyType';

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
    <NoResultPageState
      title="Your first purchase order awaits"
      description="Track the purchases you make and how much you owe your suppliers with purchase orders."
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
