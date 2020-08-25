import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getShowInactive,
  getTableTaxCodeHeader,
} from '../AccountListSelectors';
import { withStatus, withoutStatus } from './AccountListWidthConfig';
import AccountListTableBody from './AccountListTableBody';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../../components/TableView/TableView';

const emptyView = (
  <NoResultPageState
    title="No accounts found. :("
    description="Try a different search term, or show the inactive accounts."
  />
);

const AccountListTable = (props) => {
  const {
    isTableLoading,
    isTableEmpty,
    showInactive,
    taxCodeHeader,
    onAccountSelected,
  } = props;

  const tableConfig = {
    accountNumber: {
      columnName: 'Account number',
      styles: { valign: 'middle' },
    },
    accountName: { columnName: 'Account name', styles: { valign: 'middle' } },
    status: {
      columnName: 'Status',
      styles: { valign: 'middle' },
      isHidden: !showInactive,
    },
    type: { columnName: 'Account type', styles: { valign: 'middle' } },
    taxCode: { columnName: taxCodeHeader, styles: { valign: 'middle' } },
    linked: { columnName: 'Linked', styles: { valign: 'middle' } },
    level: { columnName: 'Level', styles: { valign: 'middle' } },
    balance: {
      columnName: 'Current balance ($)',
      styles: { valign: 'middle', align: 'right' },
    },
  };

  const responsiveWidths = showInactive
    ? withStatus(tableConfig)
    : withoutStatus(tableConfig);

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      responsiveWidths={responsiveWidths}
    >
      <AccountListTableBody
        tableConfig={tableConfig}
        onAccountSelected={onAccountSelected}
      />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  showInactive: getShowInactive(state),
  taxCodeHeader: getTableTaxCodeHeader(state),
});

export default connect(mapStateToProps)(AccountListTable);
