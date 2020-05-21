import {
  Alert,
  Button,
  ButtonRow,
  Card,
  FormTemplate,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountName,
  getAccountNameRequired,
  getAccountNumber,
  getAccountNumberRequired,
  getAccountSuffix,
  getAccountSuffixRequired,
  getAccountType,
  getAccountTypeRequired,
  getApplicationPreference,
  getBranchName,
  getBranchNameRequired,
  getBsb,
  getBsbBank,
  getBsbBankRequired,
  getBsbBranch,
  getBsbBranchRequired,
  getBsbRequired,
  getConfirmedApplication,
  getFinancialInstitution,
  getFormAlertState,
  getLastFourDigits,
  getLastFourDigitsRequired,
  getLoadingState,
  getNameOnCard,
  getNameOnCardRequired,
  getOnlineBankLink,
} from '../BankFeedsApplySelectors';
import BankFeedsAccountInformation from './BankFeedsAccountInformation';
import BankFeedsAccountType from './BankFeedsAccountType';
import BankFeedsApplicationMethod from './BankFeedsApplicationMethod';
import BankFeedsConfirmation from './BankFeedsConfirmation';
import BankFeedsFinancialInstitutions from './BankFeedsFinancialInstitutions';
import BankFeedsSecurity from './BankFeedsSecurity';
import PageView from '../../../../components/PageView/PageView';
import styles from './BankFeedsCreateView.module.css';

const BankFeedsCreateView = ({
  accountName,
  accountNameRequired,
  accountNumber,
  accountNumberRequired,
  accountSuffix,
  accountSuffixRequired,
  accountType,
  accountTypeRequired,
  alert,
  applicationPreference,
  branchName,
  branchNameRequired,
  bsb,
  bsbBank,
  bsbBankRequired,
  bsbBranch,
  bsbBranchRequired,
  bsbRequired,
  confirmedApplication,
  financialInstitution,
  lastFourDigits,
  lastFourDigitsRequired,
  loadingState,
  nameOnCardRequired,
  onUpdateForm,
  redirectToImportStatements,
  setAccountType,
  setApplicationPreference,
  setDisplayConnectForm,
  setFinancialInstitution,
  setFormAlertState,
  setModalState,
}) => {
  const view = (
    <div className={styles.createForm}>
      <FormTemplate
        actions={(
          <ButtonRow>
            <Button type="secondary" onClick={() => window.history.back()}>Cancel</Button>
            <Button
              onClick={() => {
                const applicationPreferenceForm = applicationPreference === 'form';

                switch (true) {
                  case applicationPreferenceForm && accountNameRequired && !accountName:
                  case applicationPreferenceForm && accountNumberRequired && !accountNumber:
                  case applicationPreferenceForm && accountSuffixRequired && !accountSuffix:
                  case applicationPreferenceForm && accountTypeRequired && !accountType:
                  case applicationPreferenceForm && branchNameRequired && !branchName:
                  case applicationPreferenceForm && bsbBankRequired && !bsbBank:
                  case applicationPreferenceForm && bsbBranchRequired && !bsbBranch:
                  case applicationPreferenceForm && bsbRequired && !bsb:
                  case applicationPreferenceForm && lastFourDigitsRequired && !lastFourDigits:
                  case applicationPreferenceForm && nameOnCardRequired && !nameOnCardRequired:
                  case !financialInstitution || !confirmedApplication:
                    setFormAlertState(true);
                    break;

                  default:
                    setFormAlertState(false);
                    setDisplayConnectForm();
                }
              }}
            >
              Next
            </Button>
          </ButtonRow>
        )}
        pageHead={<PageHead title="Create a bank feed" />}
      >
        <>
          {alert && <Alert type="danger">Please fill in all the required fields.</Alert> }

          <Card
            body={
              <Card.Body child={
                <>
                  <BankFeedsAccountType
                    setAccountType={setAccountType}
                    value={accountType}
                  />

                  <BankFeedsFinancialInstitutions
                    financialInstitution={financialInstitution}
                    redirectToImportStatements={redirectToImportStatements}
                    setFinancialInstitution={setFinancialInstitution}
                    setModalState={setModalState}
                  />

                  <BankFeedsApplicationMethod setApplicationPreference={setApplicationPreference} />

                  <BankFeedsAccountInformation onUpdateForm={onUpdateForm} />

                  <BankFeedsConfirmation onUpdateForm={onUpdateForm} />

                  <BankFeedsSecurity />
                </>
              }
              />
            }
          />
        </>
      </FormTemplate>
    </div>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  accountName: getAccountName(state),
  accountNameRequired: getAccountNameRequired(state),
  accountNumber: getAccountNumber(state),
  accountNumberRequired: getAccountNumberRequired(state),
  accountSuffix: getAccountSuffix(state),
  accountSuffixRequired: getAccountSuffixRequired(state),
  accountType: getAccountType(state),
  accountTypeRequired: getAccountTypeRequired(state),
  alert: getFormAlertState(state),
  applicationPreference: getApplicationPreference(state),
  branchName: getBranchName(state),
  branchNameRequired: getBranchNameRequired(state),
  bsb: getBsb(state),
  bsbBank: getBsbBank(state),
  bsbBankRequired: getBsbBankRequired(state),
  bsbBranch: getBsbBranch(state),
  bsbBranchRequired: getBsbBranchRequired(state),
  bsbRequired: getBsbRequired(state),
  confirmedApplication: getConfirmedApplication(state),
  financialInstitution: getFinancialInstitution(state),
  lastFourDigits: getLastFourDigits(state),
  lastFourDigitsRequired: getLastFourDigitsRequired(state),
  links: getOnlineBankLink(state),
  loadingState: getLoadingState(state),
  nameOnCard: getNameOnCard(state),
  nameOnCardRequired: getNameOnCardRequired(state),
});

export default connect(mapStateToProps)(BankFeedsCreateView);
