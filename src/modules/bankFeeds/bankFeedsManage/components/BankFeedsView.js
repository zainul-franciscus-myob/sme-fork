import {
  BaseTemplate,
  Alert as FeelixAlert,
  Icons,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsBankFeedsEmpty,
  getLoadingState,
  getModalType,
  getMyDotBankFeedsUrl,
  getShouldShowDisabledMessaging,
} from '../BankFeedsSelectors';
import Alert from './Alert';
import BankAccounts from './BankAccounts';
import BankFeedsActions from './BankFeedsActions';
import BankFeedsEmptyView from './BankFeedsEmptyView';
import BankFeedsLoginModal from './BankFeedsLoginModal';
import CreditCards from './CreditCards';
import DeleteModal from '../../../../components/modal/DeleteModal';
import LinkButton from '../../../../components/Button/LinkButton';
import ModalTypes from '../ModalTypes';
import PageView from '../../../../components/PageView/PageView';
import StickyHeader from '../../../../components/Feelix/StickyHeader/StickyHeader';

const BankFeedsView = ({
  alert,
  isBankFeedsEmpty,
  loadingState,
  // isActionDisabled,
  modalType,
  myDotBankFeedUrl,
  shouldShowDisabledMessaging,
  onBankAccountLinkedAccountChange,
  onCancelBankFeedsLogin,
  onCloseDeleteModal,
  onConfirmBankFeedsLogin,
  onCreditCardLinkedAccountChange,
  onDeleteBankFeedAccountClick,
  onDeleteBankFeedAccountConfirm,
  onDismissAlert,
  onSaveButtonClick,
  onUpdateBankFeedsLoginDetails,
  // onUpdateButtonClick,
}) => {
  const actions = !isBankFeedsEmpty && (
    <BankFeedsActions onSaveButtonClick={onSaveButtonClick} />
  );

  const alertComponent = alert && (
    <Alert alert={alert} onDismissAlert={onDismissAlert} />
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

  const tableView = isBankFeedsEmpty ? (
    <BankFeedsEmptyView />
  ) : (
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
      {shouldShowDisabledMessaging && (
        <FeelixAlert type={'info'}>
          Bank feeds can only be linked to an account when the application
          process has been complete and only after the first bank feed has
          arrived. Note that this process can take up to 10 days.
        </FeelixAlert>
      )}
      {alertComponent}
      <PageHead title="Manage bank feeds">
        <LinkButton
          href={myDotBankFeedUrl}
          icon={<Icons.OpenExternalLink />}
          iconRight
          isOpenInNewTab
        >
          Manage bank feeds via my.MYOB
        </LinkButton>
        {/* <Button */}
        {/*   type="secondary" */}
        {/*   disabled={isActionDisabled} */}
        {/*   onClick={onUpdateButtonClick} */}
        {/* > */}
        {/*  Check/update status */}
        {/* </Button> */}
      </PageHead>
    </div>
  );

  const view = (
    <BaseTemplate>
      <StickyHeader>{stickyComponents}</StickyHeader>
      {tableView}
      {modal}
      {actions}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isActionDisabled: getIsActionDisabled(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  myDotBankFeedUrl: getMyDotBankFeedsUrl(state),
  isBankFeedsEmpty: getIsBankFeedsEmpty(state),
  shouldShowDisabledMessaging: getShouldShowDisabledMessaging(state),
});

export default connect(mapStateToProps)(BankFeedsView);
