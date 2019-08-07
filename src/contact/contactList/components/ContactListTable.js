import {
  HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder, getShowHiddenColumns,
} from '../contactListSelector';
import ContactListTableBody from './ContactListTableBody';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  isActive: { width: '10rem', valign: 'top' },
  referenceId: { width: 'flex-1', valign: 'top' },
  type: { width: '15rem', valign: 'top' },
  phoneNumber: { width: '20rem', valign: 'top' },
  email: { width: 'flex-1', valign: 'top' },
  outstandingBalance: { width: '15rem', valign: 'top', align: 'right' },
  overdue: { width: '15rem', valign: 'top', align: 'right' },
};

const inActiveRowHeader = ({ order, onSort }) => (
  <Table.HeaderItem {...tableConfig.isActive}>
    <HeaderSort title="Inactive" sortName="IsActive" activeSort={order} onSort={onSort} />
  </Table.HeaderItem>
);

const ContactListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  order,
  showHiddenColumns,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      { showHiddenColumns ? inActiveRowHeader({ tableConfig, order, onSort }) : undefined }
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort title="Contact ID" sortName="DisplayId" activeSort={order} onSort={onSort} />
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
        <HeaderSort title="Balance due ($)" sortName="CurrentBalance" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.overdue}>
        <HeaderSort title="Overdue ($)" sortName="Overdue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      header={header}
      emptyMessage="There are no contacts."
    >
      <ContactListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
  showHiddenColumns: getShowHiddenColumns(state),
});

export default connect(mapStateToProps)(ContactListTable);
