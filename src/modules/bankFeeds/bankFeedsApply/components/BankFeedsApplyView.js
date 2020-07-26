import { connect } from 'react-redux';
import React from 'react';

import {
  getCopyAlertState,
  getCopyAlertText,
  getLoadingState,
  getShouldDisplayConnectForm,
  getShouldDisplayEmptyState,
} from '../BankFeedsApplySelectors';
import BankFeedsConnectView from './BankFeedsConnectView';
import BankFeedsCreateView from './BankFeedsCreateView';
import BankFeedsEmptyStateView from './BankFeedsEmptyStateView';
import PageView from '../../../../components/PageView/PageView';

const BankFeedsApplyView = ({
  copyAlertState,
  copyAlertText,
  getAuthorityForm,
  loadingState,
  onCopy,
  onNext,
  onUpdateForm,
  redirectToBank,
  redirectToBankFeeds,
  redirectToImportStatements,
  setAccountType,
  setApplicationPreference,
  setCopyAlertText,
  setFinancialInstitution,
  setFormAlertState,
  setModalState,
  shouldDisplayConnectForm,
  shouldDisplayEmptyState,
  uploadAuthorityForm,
}) => {
  const view = () => {
    if (shouldDisplayConnectForm)
      return (
        <BankFeedsConnectView
          copyAlertState={copyAlertState}
          copyAlertText={copyAlertText}
          getAuthorityForm={getAuthorityForm}
          onCopy={onCopy}
          redirectToBank={redirectToBank}
          redirectToBankFeeds={redirectToBankFeeds}
          setCopyAlertText={setCopyAlertText}
          uploadAuthorityForm={uploadAuthorityForm}
        />
      );

    if (shouldDisplayEmptyState) return <BankFeedsEmptyStateView />;

    return (
      <BankFeedsCreateView
        onUpdateForm={onUpdateForm}
        redirectToImportStatements={redirectToImportStatements}
        setAccountType={setAccountType}
        setApplicationPreference={setApplicationPreference}
        setFinancialInstitution={setFinancialInstitution}
        setFormAlertState={setFormAlertState}
        setModalState={setModalState}
        onNext={onNext}
      />
    );
  };

  return <PageView loadingState={loadingState} view={view()} />;
};

const mapStateToProps = (state) => ({
  copyAlertState: getCopyAlertState(state),
  copyAlertText: getCopyAlertText(state),
  loadingState: getLoadingState(state),
  shouldDisplayConnectForm: getShouldDisplayConnectForm(state),
  shouldDisplayEmptyState: getShouldDisplayEmptyState(state),
});

export default connect(mapStateToProps)(BankFeedsApplyView);
