import {
  Alert,
  Button,
  ButtonRow,
  Card,
  FormTemplate,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { useState } from 'react';

import {
  getAccountName,
  getAccountNameRequired,
  getAccountNumber,
  getAccountNumberRequired,
  getAccountSuffix,
  getAccountSuffixRequired,
  getAccountType,
  getAccountTypeRequired,
  getBranchName,
  getBranchNameRequired,
  getBsb,
  getBsbBank,
  getBsbBankRequired,
  getBsbBranch,
  getBsbBranchRequired,
  getBsbRequired,
  getFinancialInstitution,
  getLastFourDigits,
  getLastFourDigitsRequired,
  getLoadingState,
  getNameOnCard,
  getNameOnCardRequired,
} from '../BankFeedsCreateSelectors';
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
  branchName,
  branchNameRequired,
  bsb,
  bsbBank,
  bsbBankRequired,
  bsbBranch,
  bsbBranchRequired,
  bsbRequired,
  financialInstitution,
  lastFourDigits,
  lastFourDigitsRequired,
  loadingState,
  nameOnCardRequired,
  onUpdateForm,
  redirectToConnectBankFeed,
  redirectToImportStatements,
  setAccountType,
  setApplicationPreference,
  setFinancialInstitution,
  setModalState,
}) => {
  const [displayAlert, setAlert] = useState(false);

  const view = (
    <div className={styles.createForm}>
      <FormTemplate
        actions={(
          <ButtonRow>
            <Button type="secondary" onClick={() => window.history.back()}>Cancel</Button>
            <Button onClick={() => {
              switch (true) {
                case accountNameRequired && !accountName:
                case accountNumberRequired && !accountNumber:
                case accountSuffixRequired && !accountSuffix:
                case accountTypeRequired && !accountType:
                case branchNameRequired && !branchName:
                case bsbBankRequired && !bsbBank:
                case bsbBranchRequired && !bsbBranch:
                case bsbRequired && !bsb:
                case lastFourDigitsRequired && !lastFourDigits:
                case nameOnCardRequired && !nameOnCardRequired:
                  setAlert(true);
                  break;

                default:
                  setAlert(false);
                  redirectToConnectBankFeed();
              }
            }}
            >Next</Button>
          </ButtonRow>
        )}
        pageHead={<PageHead title="Create a bank feed" />}
      >
        <>
          {displayAlert && <Alert type="danger">Please fill in all the required fields.</Alert> }

          <Card
            body={
              <Card.Body child={
                <>
                  <BankFeedsAccountType value={accountType} setAccountType={setAccountType} />

                  <BankFeedsFinancialInstitutions
                    financialInstitution={financialInstitution}
                    setFinancialInstitution={setFinancialInstitution}
                    redirectToImportStatements={redirectToImportStatements}
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
  branchName: getBranchName(state),
  branchNameRequired: getBranchNameRequired(state),
  bsb: getBsb(state),
  bsbBank: getBsbBank(state),
  bsbBankRequired: getBsbBankRequired(state),
  bsbBranch: getBsbBranch(state),
  bsbBranchRequired: getBsbBranchRequired(state),
  bsbRequired: getBsbRequired(state),
  financialInstitution: getFinancialInstitution(state),
  lastFourDigits: getLastFourDigits(state),
  lastFourDigitsRequired: getLastFourDigitsRequired(state),
  loadingState: getLoadingState(state),
  nameOnCard: getNameOnCard(state),
  nameOnCardRequired: getNameOnCardRequired(state),
});

export default connect(mapStateToProps)(BankFeedsCreateView);
