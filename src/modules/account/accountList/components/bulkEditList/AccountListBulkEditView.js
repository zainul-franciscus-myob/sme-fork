import { Button, ButtonRow, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLoadingState,
  getRawEntries,
  getSaveBtnEnabled,
  getTableTaxCodeHeader,
} from '../../AccountListSelectors';
import AccountBulkEditListTableBody from './AccountBulkEditListTableBody';
import AccountBulkEditListTableHeader from './AccountBulkEditListTableHeader';
import AccountListTable from '../AccountListTable';
import PageView from '../../../../../components/PageView/PageView';
import StandardTemplate from '../../../../../components/Feelix/StandardTemplate/StandardTemplate';
import styles from '../AccountListTable.module.css';

const AccountListBulkEditView = ({
  loadingState,
  onAccountDetailsChange,
  taxCodeHeader,
  onCancel,
  onSave,
  saveBtnEnabled,
}) => {
  const pageHead = (
    <PageHead title="Edit Accounts">
      <ButtonRow className={styles.bulkUpdateButtonRow}>
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={onSave} disabled={!saveBtnEnabled}>
          Save
        </Button>
      </ButtonRow>
    </PageHead>
  );

  const tableConfig = {
    accountNumber: {
      columnName: 'Account number',
      styles: { valign: 'middle' },
    },
    accountName: { columnName: 'Account name', styles: { valign: 'middle' } },
    type: { columnName: 'Account type', styles: { valign: 'middle' } },
    taxCode: { columnName: taxCodeHeader, styles: { valign: 'middle' } },
    openingBalance: {
      columnName: 'Opening balance ($)',
      fieldName: 'openingBalance',
      styles: { valign: 'middle', align: 'right' },
    },
    balance: {
      columnName: 'Current balance ($)',
      styles: { valign: 'middle', align: 'right' },
    },
  };

  const tableHeader = (
    <AccountBulkEditListTableHeader tableConfig={tableConfig} />
  );

  const tableBody = (
    <AccountBulkEditListTableBody
      tableConfig={tableConfig}
      onAccountDetailsChange={onAccountDetailsChange}
    />
  );

  const accountView = (
    <React.Fragment>
      <StandardTemplate pageHead={pageHead} tableHeader={tableHeader}>
        <AccountListTable tableBody={tableBody} />
      </StandardTemplate>
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={accountView} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  entries: getRawEntries(state),
  taxCodeHeader: getTableTaxCodeHeader(state),
  saveBtnEnabled: getSaveBtnEnabled(state),
});

export default connect(mapStateToProps)(AccountListBulkEditView);
