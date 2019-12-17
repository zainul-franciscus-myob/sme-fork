import {
  BaseTemplate, Icons, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getCreateBankFeedsUrl, getIsBankFeedsEmpty, getIsLoading, getModalType,
} from '../BankFeedsSelectors';
import Alert from './Alert';
import BankAccounts from './BankAccounts';
import BankFeedsActions from './BankFeedsActions';
import BankFeedsEmptyView from './BankFeedsEmptyView';
import CreditCards from './CreditCards';
import DeleteModal from '../../../components/modal/DeleteModal';
import LinkButton from '../../../components/Button/LinkButton';
import PageView from '../../../components/PageView/PageView';

const BankFeedsView = ({
  alert,
  modalType,
  manageBankFeedsLink,
  isBankFeedsEmpty,
  isLoading,
  onSaveButtonClick,
  onDismissAlert,
  onCloseDeleteModal,
  onDeleteBankFeedAccountConfirm,
  onBankAccountLinkedAccountChange,
  onCreditCardLinkedAccountChange,
  onDeleteBankFeedAccountClick,
}) => {
  const actions = !isBankFeedsEmpty && (
    <BankFeedsActions onSaveButtonClick={onSaveButtonClick} />
  );

  const alertComponent = alert && (
    <Alert
      alert={alert}
      onDismissAlert={onDismissAlert}
    />
  );

  const deleteBankFeedAccountConfirmationModal = modalType && (
    <DeleteModal
      onCancel={onCloseDeleteModal}
      onConfirm={onDeleteBankFeedAccountConfirm}
      title="Delete this bank feed account?"
    />
  );

  const tableView = isBankFeedsEmpty
    ? (
      <BankFeedsEmptyView />
    )
    : (
      <>
        <BankAccounts
          onBankAccountLinkedAccountChange={onBankAccountLinkedAccountChange}
          onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
        />
        <CreditCards
          onCreditCardLinkedAccountChange={onCreditCardLinkedAccountChange}
          onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
        />
      </>
    );

  const stickyComponents = (
    <div>
      {alertComponent}
      <PageHead title="Manage bank feeds">
        <LinkButton
          href={manageBankFeedsLink}
          icon={<Icons.OpenExternalLink />}
          iconRight
          isOpenInNewTab
        >
          Manage bank feeds via my.MYOB
        </LinkButton>
      </PageHead>
    </div>
  );

  const view = (
    <BaseTemplate stickyHeaderChildren={stickyComponents}>
      {tableView}
      {deleteBankFeedAccountConfirmationModal}
      {actions}
    </BaseTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  manageBankFeedsLink: getCreateBankFeedsUrl(state),
  isBankFeedsEmpty: getIsBankFeedsEmpty(state),
});

export default connect(mapStateToProps)(BankFeedsView);
