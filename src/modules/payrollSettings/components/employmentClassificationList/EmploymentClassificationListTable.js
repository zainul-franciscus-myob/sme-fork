import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../../selectors/employmentClassificationListSelectors';
import EmploymentClassificationListTableBody from './EmploymentClassificationListTableBody';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';

const tableConfig = {
  classification: { width: 'flex-1', valign: 'top' },
};

const emptyView = (
  <NoResultPageState
    title="You have not created any classifications yet."
    description="Your classifications will show here once they created."
  />
);

const EmploymentClassificationListTable = (props) => {
  const {
    isTableLoading,
    isTableEmpty,
    order,
    onSort,
    onClickRowButton,
  } = props;

  let tableBodyView;
  if (isTableLoading) {
    tableBodyView = <LoadingPageState size="medium" />;
  } else if (isTableEmpty) {
    tableBodyView = emptyView;
  } else {
    tableBodyView = (
      <EmploymentClassificationListTableBody
        tableConfig={tableConfig}
        onClickRowButton={onClickRowButton}
      />
    );
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.classification}>
          <HeaderSort
            title="Name"
            sortName="Description"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
      </Table.Header>
      {tableBodyView}
    </Table>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(EmploymentClassificationListTable);
