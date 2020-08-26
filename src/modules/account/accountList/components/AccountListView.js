import { Alert, ButtonRow, PageHead, Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getRawEntries,
  getShowDeleteModal,
  getType,
} from '../AccountListSelectors';
import { tabItems } from '../tabItems';
import AccountListFilterOptions from './AccountListFilterOptions';
import AccountListTable from './AccountListTable';
import AccountListTableHeader from './AccountListTableHeader';
import Button from '../../../../components/Button/Button';
import DeleteModal from '../../../../components/modal/DeleteModal';
import PageView from '../../../../components/PageView/PageView';
import StandardTemplate from '../../../../components/Feelix/StandardTemplate/StandardTemplate';
import Tabs from '../../../../components/Tabs/Tabs';
import styles from './AccountListTable.module.css';
import uuid from '../../../../common/uuid/uuid';

const AccountListView = ({
  alert,
  loadingState,
  selectedTab,
  onDismissAlert,
  onUpdateFilterOptions,
  onResetFilterOptions,
  onTabSelect,
  onEditLinkedAccountButtonClick,
  onCreateAccountButtonClick,
  onImportChartOfAccountsClick,
  onAccountSelected,
  onAllAccountsSelected,
  entries,
  onDeleteAccountsButtonClick,
  onDeleteConfirmButtonClick,
  onCloseModal,
  showDeleteModal,
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
      onCancel={onCloseModal}
      onConfirm={onDeleteConfirmButtonClick}
      title="Delete selected accounts?"
    />
  );

  const pageHead = (
    <PageHead title="Accounts">
      <ButtonRow>
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
  const deleteBar = numSelected > 0 && (
    <div className={styles.deleteBar}>
      <Button type="secondary" onClick={onDeleteAccountsButtonClick}>
        Delete accounts
      </Button>
      <span className={styles.deleteAccountsText}>
        {numSelected} Items selected
      </span>
    </div>
  );

  const tableHeader = (
    <AccountListTableHeader onAllAccountsSelected={onAllAccountsSelected} />
  );

  const accountView = (
    <React.Fragment>
      <StandardTemplate
        alert={alertComponents}
        pageHead={pageHead}
        filterBar={filterBar}
        subHeadChildren={tabs}
        tableHeader={tableHeader}
        bulkActions={deleteBar}
      >
        {showDeleteModal && modal}
        <AccountListTable onAccountSelected={onAccountSelected} />
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
  showDeleteModal: getShowDeleteModal(state),
});

export default connect(mapStateToProps)(AccountListView);
