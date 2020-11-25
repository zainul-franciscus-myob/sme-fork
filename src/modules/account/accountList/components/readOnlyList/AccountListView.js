import {
  Alert,
  ButtonRow,
  PageHead,
  Separator,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getModalType,
  getRawEntries,
  getShowInactive,
  getTableTaxCodeHeader,
  getType,
} from '../../AccountListSelectors';
import { tabItems } from '../../tabItems';
import AccountListFilterOptions from '../AccountListFilterOptions';
import AccountListModalType from '../AccountListModalType';
import AccountListTable from '../AccountListTable';
import AccountListTableBody from './AccountListTableBody';
import AccountListTableHeader from './AccountListTableHeader';
import ActionBar from './ActionBar';
import Button from '../../../../../components/Button/Button';
import DeleteModal from '../../../../../components/modal/DeleteModal';
import PageView from '../../../../../components/PageView/PageView';
import Tabs from '../../../../../components/Tabs/Tabs';
import uuid from '../../../../../common/uuid/uuid';

const AccountListView = ({
  accountAllowedToMoveUp,
  accountAllowedToMoveDown,
  alert,
  loadingState,
  selectedTab,
  cannotMoveAccountUpMessage,
  cannotMoveAccountDownMessage,
  onDismissAlert,
  onUpdateFilterOptions,
  onResetFilterOptions,
  onTabSelect,
  onEditLinkedAccountButtonClick,
  onCreateAccountButtonClick,
  onImportChartOfAccountsClick,
  onAccountSelected,
  onAccountMoveUpClick,
  onAccountMoveDownClick,
  onAllAccountsSelected,
  entries,
  onDeleteConfirmButtonClick,
  onEditAccountsClick,
  showInactive,
  taxCodeHeader,
  taxCodeList,
  onDeleteClick,
  onBulkUpdateModalCancelClick,
  modalType,
  hasFlexibleAccountNumbers,
  onBulkUpdateTaxCodeChange,
  onBulkUpdateTaxCodeSaveClick,
  onBulkUpdateTaxCodeOpen,
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

  const modal = (
    <DeleteModal
      onCancel={onBulkUpdateModalCancelClick}
      onConfirm={onDeleteConfirmButtonClick}
      title="Delete selected accounts?"
    />
  );

  const pageHead = (
    <PageHead title="Accounts">
      <ButtonRow>
        <Button type="secondary" onClick={onEditAccountsClick}>
          Edit accounts
        </Button>
        <Button type="secondary" onClick={onEditLinkedAccountButtonClick}>
          Edit linked accounts
        </Button>
        <Separator direction="vertical" />
        <Button type="secondary" onClick={onImportChartOfAccountsClick}>
          Import chart of accounts
        </Button>
        <Button type="primary" onClick={onCreateAccountButtonClick}>
          Create account
        </Button>
      </ButtonRow>
    </PageHead>
  );

  const filterBar = (
    <AccountListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onResetFilterOptions={onResetFilterOptions}
    />
  );
  const tabs = (
    <Tabs items={tabItems} selected={selectedTab} onSelected={onTabSelect} />
  );

  const numSelected = entries.filter((entry) => entry.selected).length;
  const actionBar = numSelected > 0 && (
    <ActionBar
      accountAllowedToMoveUp={accountAllowedToMoveUp}
      onAccountMoveUpClick={onAccountMoveUpClick}
      cannotMoveAccountUpMessage={cannotMoveAccountUpMessage}
      accountAllowedToMoveDown={accountAllowedToMoveDown}
      onAccountMoveDownClick={onAccountMoveDownClick}
      cannotMoveAccountDownMessage={cannotMoveAccountDownMessage}
      hasFlexibleAccountNumbers={hasFlexibleAccountNumbers}
      numSelected={numSelected}
      taxCodeList={taxCodeList}
      onDeleteClick={onDeleteClick}
      onBulkUpdateTaxCodeChange={onBulkUpdateTaxCodeChange}
      onBulkUpdateTaxCodeSaveClick={onBulkUpdateTaxCodeSaveClick}
      onBulkUpdateTaxCodeOpen={onBulkUpdateTaxCodeOpen}
    />
  );

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

  const tableHeader = (
    <AccountListTableHeader
      onAllAccountsSelected={onAllAccountsSelected}
      tableConfig={tableConfig}
    />
  );

  const tableBody = (
    <AccountListTableBody
      tableConfig={tableConfig}
      onAccountSelected={onAccountSelected}
    />
  );

  const accountView = (
    <React.Fragment>
      <StandardTemplate
        alert={alertComponents}
        pageHead={pageHead}
        filterBar={filterBar}
        subHeadChildren={tabs}
        tableHeader={tableHeader}
        bulkActions={actionBar}
      >
        {modalType === AccountListModalType.DELETE && modal}
        <AccountListTable
          onAccountSelected={onAccountSelected}
          tableBody={tableBody}
        />
      </StandardTemplate>
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={accountView} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  selectedTab: getType(state),
  entries: getRawEntries(state),
  modalType: getModalType(state),
  showInactive: getShowInactive(state),
  taxCodeHeader: getTableTaxCodeHeader(state),
});

export default connect(mapStateToProps)(AccountListView);
