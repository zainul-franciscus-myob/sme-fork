import { Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading,
} from '../contactList/contactListSelector';
import ContactListTableBody from './ContactListTableBody';
import style from './ContactListView.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  type: { width: '15rem', valign: 'top' },
  phoneNumber: { width: '20rem', valign: 'top' },
  email: { width: 'flex-1', valign: 'top' },
  outstandingBalance: { width: 'flex-1', valign: 'top' },
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
  businessId,
}) => {
  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (
      <ContactListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    );
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.phoneNumber}>Phone number</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.email}>Email</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.outstandingBalance}>
          Outstanding balance ($)
        </Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(ContactListTable);
