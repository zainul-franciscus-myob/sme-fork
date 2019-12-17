import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getIsHeader, getIsLoading, getModalType,
} from '../accountDetailSelectors';
import AccountCategory from './AccountCategory';
import AccountDetailActions from './AccountDetailActions';
import AccountDetailSummaryHeader from './AccountDetailSummaryHeader';
import AccountHeader from './AccountHeader';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import DetailView from './DetailView';
import FormCard from '../../../../components/FormCard/FormCard';
import HeaderView from './HeaderView';
import PageView from '../../../../components/PageView/PageView';

const AccountDetailView = ({
  isCreating,
  isLoading,
  isHeader,
  modalType,
  alertMessage,

  bankSectionComponent,

  onBankDetailsChange,
  onAccountChange,
  onAccountNumberChange,
  onAccountNumberBlur,
  onHeaderAccountTypeChange,
  onDetailAccountTypeChange,
  onUpdateAccountCategory,

  onDismissAlert,
  onCancelModal,
  onDeleteModal,
  onCloseModal,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this account?"
      />
    );
  }

  const summaryHeader = !isCreating && <AccountDetailSummaryHeader />;
  const accountCategoryContent = isHeader ? (
    <HeaderView
      onAccountChange={onAccountChange}
      onAccountNumberChange={onAccountNumberChange}
      onAccountNumberBlur={onAccountNumberBlur}
      onAccountTypeChange={onHeaderAccountTypeChange}
    />
  ) : (
    <DetailView
      onBankDetailsChange={onBankDetailsChange}
      bankSectionComponent={bankSectionComponent}
      onAccountChange={onAccountChange}
      onAccountNumberChange={onAccountNumberChange}
      onAccountNumberBlur={onAccountNumberBlur}
      onAccountTypeChange={onDetailAccountTypeChange}
    />
  );
  const view = (
    <FormTemplate
      pageHead={<AccountHeader />}
      alert={alertComponent}
      sticky="none"
      actions={(
        <AccountDetailActions
          isCreating={isCreating}
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
)}
    >
      {modal}
      <FormCard>
        {summaryHeader}
        <AccountCategory onChange={onUpdateAccountCategory} />
        {accountCategoryContent}
      </FormCard>
    </FormTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  isHeader: getIsHeader(state),
});

export default connect(mapStateToProps)(AccountDetailView);
