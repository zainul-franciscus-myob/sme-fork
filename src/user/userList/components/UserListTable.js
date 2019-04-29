import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../userListSelectors';
import { getOrder } from '../../../quote/quoteList/quoteListSelector';
import UserListTableBody from './UserListTableBody';
import style from './UserListView.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  email: { width: 'flex-1', valign: 'top' },
  advisor: { width: '15rem', valign: 'top' },
  status: { width: '15rem', valign: 'top' },
};

const emptyView = (
  <div className={style.empty}>
    There are no users.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const UserListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  order,
}) => {
  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (<UserListTableBody tableConfig={tableConfig} />);
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>
          <HeaderSort title="Name" sortName="UserName" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.email}>
          <HeaderSort title="Email" sortName="Email" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.advisor}>
          <HeaderSort title="Advisor" sortName="IsAdvisor" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.status}>
          <HeaderSort title="Status" sortName="IsActive" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(UserListTable);
