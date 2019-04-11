import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../contactListSelector';
import ContactListTableBody from './ContactListTableBody';
import style from './ContactListView.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  type: { width: '15rem', valign: 'top' },
  phoneNumber: { width: '20rem', valign: 'top' },
  email: { width: 'flex-1', valign: 'top' },
  outstandingBalance: { width: 'flex-1', valign: 'top', align: 'right' },
};

const emptyView = (
  <div className={style.empty}>
    There are no contacts.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const ContactListTable = ({
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
    view = (
      <ContactListTableBody
        tableConfig={tableConfig}
      />
    );
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>
          <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.type}>
          <HeaderSort title="Type" sortName="Type" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.phoneNumber}>
          <HeaderSort title="Phone number" sortName="Phone" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.email}>
          <HeaderSort title="Email" sortName="Email" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.outstandingBalance}>
          <HeaderSort title="Outstanding balance ($)" sortName="CurrentBalance" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(ContactListTable);
