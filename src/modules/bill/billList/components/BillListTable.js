import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getTableBodyState,
} from '../billListSelectors';
import BillListTableBody from './BillListTableBody';
import Icon from '../../../../components/Icon/Icon';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import TableBodyType from '../TableBodyType';
import billsEmptyStateImage from './bills-empty-state.svg';

const BillListTable = ({
  isTableEmpty,
  isTableLoading,
  tableBodyState,
  onCreateButtonClick,
  tableConfig,
}) => {
  const noResultsPageState = (
    <PageState
      title="No bills found"
      description="Perhaps check the dates or remove the filters and try again."
      image={<Icon.NoResultState alt="No bills found" />}
    />
  );

  const emptyPageState = (
    <PageState
      title="Create bills"
      description="Create a record of the bills you receive from suppliers. You'll be able to keep track of payments and due dates more easily."
      image={
        <img
          src={billsEmptyStateImage}
          style={{ width: '25%' }}
          alt="Create bills"
        />
      }
      actions={[
        <Button type="link" icon={<Icons.Add />} onClick={onCreateButtonClick}>
          Create bill
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
      <BillListTableBody tableConfig={tableConfig} />
    </StickyTableBody>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  tableBodyState: getTableBodyState(state),
});

export default connect(mapStateToProps)(BillListTable);
