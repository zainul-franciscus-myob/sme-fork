import {
  HeaderSort, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsTableEmpty } from '../../../contact/contactList/contactListSelector';
import { getIsTableLoading, getOrder } from '../EmployeeListSelectors';
import EmployeeListTableBody from './EmployeeListTableBody';
import style from './EmployeeListView.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  phoneNumber: { width: 'flex-1', valign: 'top' },
  email: { width: 'flex-1', valign: 'top' },
};

const emptyView = (
  <div className={style.empty}>
    There are no employees.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const EmployeeListTable = ({
  isTableLoading, order, onSort, isTableEmpty,
}) => {
  let tableBodyView;
  if (isTableLoading) {
    tableBodyView = spinnerView;
  } else if (isTableEmpty) {
    tableBodyView = emptyView;
  } else {
    tableBodyView = <EmployeeListTableBody tableConfig={tableConfig} />;
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>
          <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.phoneNumber}>
          <HeaderSort title="Phone" sortName="Phone" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.email}>
          <HeaderSort title="Email" sortName="Email" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      </Table.Header>
      {tableBodyView}
    </Table>
  );
};

EmployeeListTable.propTypes = {
  isTableLoading: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
  isTableEmpty: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  order: getOrder(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(EmployeeListTable);
