import { connect } from 'react-redux';
import React from 'react';

import {
  getApplicationPreference,
  getCopyAlertState,
  getCopyAlertText,
  getLoadingState,
  getShouldDisplayConnectForm,
} from '../BankFeedsApplySelectors';
import BankFeedsConnectView from './BankFeedsConnectView';
import BankFeedsCreateView from './BankFeedsCreateView';
import PageView from '../../../../components/PageView/PageView';

const BankFeedsApplyView = ({
  applicationPreference,
  copyAlertState,
  copyAlertText,
  loadingState,
  onCopy,
  onUpdateForm,
  redirectToBank,
  redirectToBankFeeds,
  redirectToImportStatements,
  setAccountType,
  setApplicationPreference,
  setCopyAlertText,
  setDisplayConnectForm,
  setFinancialInstitution,
  setFormAlertState,
  setModalState,
  shouldDisplayConnectForm,
}) => {
  const view = shouldDisplayConnectForm
    ? (
      <BankFeedsConnectView
        applicationPreference={applicationPreference}
        copyAlertState={copyAlertState}
        copyAlertText={copyAlertText}
        onCopy={onCopy}
        redirectToBank={redirectToBank}
        redirectToBankFeeds={redirectToBankFeeds}
        setCopyAlertText={setCopyAlertText}
      />
    ) : (
      <BankFeedsCreateView
        onUpdateForm={onUpdateForm}
        redirectToImportStatements={redirectToImportStatements}
        setAccountType={setAccountType}
        setApplicationPreference={setApplicationPreference}
        setDisplayConnectForm={setDisplayConnectForm}
        setFinancialInstitution={setFinancialInstitution}
        setFormAlertState={setFormAlertState}
        setModalState={setModalState}
      />
    );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  applicationPreference: getApplicationPreference(state),
  copyAlertState: getCopyAlertState(state),
  copyAlertText: getCopyAlertText(state),
  loadingState: getLoadingState(state),
  shouldDisplayConnectForm: getShouldDisplayConnectForm(state),
});

export default connect(mapStateToProps)(BankFeedsApplyView);
