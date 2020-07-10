import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getShowInactive,
  getTableTaxCodeHeader,
} from '../AccountListSelectors';

const HeaderItem = ({ config }) =>
  !config.isHidden && (
    <Table.HeaderItem columnName={config.columnName} {...config.styles}>
      {config.columnName}
    </Table.HeaderItem>
  );

const AccountListTableHeader = (props) => {
  const { showInactive, taxCodeHeader } = props;

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

  return (
    <Table>
      <Table.Header>
        <HeaderItem config={tableConfig.accountNumber} />
        <HeaderItem config={tableConfig.accountName} />
        <HeaderItem config={tableConfig.status} />
        <HeaderItem config={tableConfig.type} />
        <HeaderItem config={tableConfig.taxCode} />
        <HeaderItem config={tableConfig.linked} />
        <HeaderItem config={tableConfig.level} />
        <HeaderItem config={tableConfig.balance} />
      </Table.Header>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  showInactive: getShowInactive(state),
  taxCodeHeader: getTableTaxCodeHeader(state),
});

export default connect(mapStateToProps)(AccountListTableHeader);
