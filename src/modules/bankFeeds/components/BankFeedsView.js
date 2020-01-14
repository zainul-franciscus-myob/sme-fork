import {
  BaseTemplate, Button, Icons, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getCreateBankFeedsUrl,
  getIsActionDisabled,
  getIsBankFeedsEmpty,
  getLoadingState,
  getModalType,
} from '../BankFeedsSelectors';
import Alert from './Alert';
import BankAccounts from './BankAccounts';
import BankFeedsActions from './BankFeedsActions';
import BankFeedsEmptyView from './BankFeedsEmptyView';
import BankFeedsLoginModal from './BankFeedsLoginModal';
import CreditCards from './CreditCards';
import DeleteModal from '../../../components/modal/DeleteModal';
import LinkButton from '../../../components/Button/LinkButton';
import ModalTypes from '../ModalTypes';
import PageView from '../../../components/PageView/PageView';

const BankFeedsView = ({
  alert,
  modalType,
  manageBankFeedsLink,
  isBankFeedsEmpty,
  loadingState,
  isActionDisabled,
  onSaveButtonClick,
  onDismissAlert,
  onCloseDeleteModal,
  onDeleteBankFeedAccountConfirm,
  onBankAccountLinkedAccountChange,
  onCreditCardLinkedAccountChange,
  onDeleteBankFeedAccountClick,
  onCancelBankFeedsLogin,
  onConfirmBankFeedsLogin,
  onUpdateBankFeedsLoginDetails,
  onUpdateButtonClick,
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

  const modal = {
    [ModalTypes.DELETE]: (
      <DeleteModal
        onCancel={onCloseDeleteModal}
        onConfirm={onDeleteBankFeedAccountConfirm}
        title="Delete this bank feed account?"
      />
    ),
    [ModalTypes.BANK_FEEDS_LOGIN]: (
      <BankFeedsLoginModal
        onCancelBankFeedsLogin={onCancelBankFeedsLogin}
        onConfirmBankFeedsLogin={onConfirmBankFeedsLogin}
        onUpdateBankFeedsLoginDetails={onUpdateBankFeedsLoginDetails}
      />
    ),
  }[modalType];

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
        <Button
          type="secondary"
          disabled={isActionDisabled}
          onClick={onUpdateButtonClick}
        >
          Check/update status
        </Button>
      </PageHead>
    </div>
  );

  const view = (
    <BaseTemplate stickyHeaderChildren={stickyComponents}>
      {tableView}
      {modal}
      {actions}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isActionDisabled: getIsActionDisabled(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  manageBankFeedsLink: getCreateBankFeedsUrl(state),
  isBankFeedsEmpty: getIsBankFeedsEmpty(state),
});

export default connect(mapStateToProps)(BankFeedsView);
