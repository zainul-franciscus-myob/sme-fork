import {
  Alert,
  Button,
  ButtonRow,
  PageHead,
  Tooltip,
  TotalsHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDirtyEntries,
  getLoadingState,
  getModalType,
  getOpeningBalanceDate,
  getRawEntries,
  getRedirectUrl,
  getRemainingHistoricalBalance,
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
import formatCurrency from '../../../../../common/valueFormatters/formatCurrency';
import styles from '../AccountListTable.module.css';
import uuid from '../../../../../common/uuid/uuid';

const AccountListBulkEditView = ({
  alert,
  onDismissAlert,
  loadingState,
  onAccountDetailsChange,
  taxCodeHeader,
  saveBtnEnabled,
  openingBalanceDate,
  modalType,
  redirectUrl,
  remainingHistoricalBalance,
  onBulkUpdateCancelClick,
  onBulkUpdateSaveClick,
  onBulkUpdateDiscardClick,
  onBulkUpdateModalCancelClick,
  calculateRemainingHistoricalBalance,
}) => {
  const alertComponents =
    alert &&
    alert.map((a, i) => (
      <Alert
        type={a.type}
        key={uuid()}
        dismissAfter={a.type === 'success' && 8000}
        onDismiss={() => onDismissAlert(i)}
      >
        {a.message}
      </Alert>
    ));

  const pageHead = (
    <PageHead title="Edit Accounts">
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
      fieldName: 'accountNumber',
      styles: { valign: 'middle', width: '20rem' },
    },
    accountName: {
      columnName: 'Account name',
      fieldName: 'accountName',
      styles: { valign: 'middle' },
    },
    type: {
      columnName: 'Account type',
      fieldName: 'subAccountType',
      styles: { valign: 'middle', width: '20rem' },
    },
    taxCode: {
      columnName: taxCodeHeader,
      fieldName: 'taxCodeId',
      styles: { valign: 'middle', width: '12rem' },
    },
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
      calculateRemainingHistoricalBalance={calculateRemainingHistoricalBalance}
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

  const totalItems = [
    <TotalsHeader.TotalItem
      key="openingBalanceDate"
      label="Opening Balance Date"
      count={openingBalanceDate}
    />,
    <Tooltip key="tooltip" className={styles.tooltip}>
      This will be the opening balance of your Historical Balancing account
    </Tooltip>,
    <TotalsHeader.TotalItem
      className={styles.remainingBalance}
      key="remainingAllocation"
      label="Remaining Balance"
      count={formatCurrency(remainingHistoricalBalance)}
    />,
  ];

  const subHeadChildren = <TotalsHeader totalItems={totalItems} />;

  const accountView = (
    <React.Fragment>
      <StandardTemplate
        alert={alertComponents}
        pageHead={pageHead}
        tableHeader={tableHeader}
        subHeadChildren={subHeadChildren}
      >
        {modal}
        <AccountListTable tableBody={tableBody} />
      </StandardTemplate>
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={accountView} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  entries: getRawEntries(state),
  taxCodeHeader: getTableTaxCodeHeader(state),
  openingBalanceDate: getOpeningBalanceDate(state),
  saveBtnEnabled: getDirtyEntries(state).length > 0,
  modalType: getModalType(state),
  redirectUrl: getRedirectUrl(state),
  remainingHistoricalBalance: getRemainingHistoricalBalance(state),
});

export default connect(mapStateToProps)(AccountListBulkEditView);
