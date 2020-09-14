import { Button, ButtonRow, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDirtyEntries,
  getLoadingState,
  getModalType,
  getOpeningBalanceDate,
  getRawEntries,
  getRedirectUrl,
  getTableTaxCodeHeader,
} from '../../AccountListSelectors';
import AccountBulkEditListTableBody from './AccountBulkEditListTableBody';
import AccountBulkEditListTableHeader from './AccountBulkEditListTableHeader';
import AccountListModalType from '../AccountListModalType';
import AccountListTable from '../AccountListTable';
import CancelModal from '../../../../../components/modal/CancelModal';
import PageView from '../../../../../components/PageView/PageView';
import StandardTemplate from '../../../../../components/Feelix/StandardTemplate/StandardTemplate';
import UnsavedModal from '../../../../../components/modal/UnsavedModal';
import styles from '../AccountListTable.module.css';

const AccountListBulkEditView = ({
  loadingState,
  onAccountDetailsChange,
  taxCodeHeader,
  saveBtnEnabled,
  openingBalanceDate,
  modalType,
  redirectUrl,
  onBulkUpdateCancelClick,
  onBulkUpdateSaveClick,
  onBulkUpdateDiscardClick,
  onBulkUpdateModalCancelClick,
}) => {
  const pageHead = (
    <PageHead title="Edit Accounts">
      <span>Opening Balance Date {openingBalanceDate}</span>
      <ButtonRow className={styles.bulkUpdateButtonRow}>
        <Button type="secondary" onClick={onBulkUpdateCancelClick}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onBulkUpdateSaveClick}
          disabled={!saveBtnEnabled}
        >
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

  let modal;
  if (modalType === AccountListModalType.CANCEL) {
    modal = (
      <CancelModal
        onCancel={onBulkUpdateModalCancelClick}
        onConfirm={() => onBulkUpdateDiscardClick(redirectUrl)}
      />
    );
  } else if (modalType === AccountListModalType.UNSAVED) {
    modal = (
      <UnsavedModal
        onCancel={onBulkUpdateModalCancelClick}
        onConfirmUnsave={() => onBulkUpdateDiscardClick(redirectUrl)}
        onConfirmSave={onBulkUpdateSaveClick}
      />
    );
  }

  const accountView = (
    <React.Fragment>
      <StandardTemplate pageHead={pageHead} tableHeader={tableHeader}>
        {modal}
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
  openingBalanceDate: getOpeningBalanceDate(state),
  saveBtnEnabled: getDirtyEntries(state).length > 0,
  modalType: getModalType(state),
  redirectUrl: getRedirectUrl(state),
});

export default connect(mapStateToProps)(AccountListBulkEditView);
