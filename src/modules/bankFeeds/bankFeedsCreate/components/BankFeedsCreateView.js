import {
  Button,
  ButtonRow,
  Card,
  FormTemplate,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState } from '../BankFeedsCreateSelectors';
import BankFeedsAccountInformation from './BankFeedsAccountInformation';
import BankFeedsAccountType from './BankFeedsAccountType';
import BankFeedsApplicationMethod from './BankFeedsApplicationMethod';
import BankFeedsConfirmation from './BankFeedsConfirmation';
import BankFeedsFinancialInstitutions from './BankFeedsFinancialInstitutions';
import BankFeedsSecurity from './BankFeedsSecurity';
import PageView from '../../../../components/PageView/PageView';
import styles from './BankFeedsCreateView.module.css';

const BankFeedsCreateView = ({
  loadingState,
  onUpdateForm,
  redirectToImportStatements,
  resetAccountInformation,
  setAccountNameRequired,
  setAccountNumberRequired,
  setAccountSuffixRequired,
  setAccountTypeRequired,
  setApplicationPreference,
  setBranchNameRequired,
  setBSBBankRequired,
  setBSBBranchRequired,
  setBSBRequired,
  setLastFourDigitsRequired,
  setModalState,
  setNotes,
  setNameOnCardRequired,
  setOnlineApplicationSupported,
  setPaperApplicationSupported,
}) => {
  const view = (
    <div style={{ maxWidth: '768px', margin: '0 auto' }} className={styles.createForm}>
      <FormTemplate
        actions={(
          <ButtonRow>
            <Button type="secondary" onClick={() => window.history.back()}>Cancel</Button>
            <Button onClick={() => ('clicked')}>Next</Button>
          </ButtonRow>
        )}
        pageHead={<PageHead title="Create a bank feed" />}
      >
        <Card
          body={
            <Card.Body child={
              <>
                <BankFeedsAccountType onUpdateForm={onUpdateForm} />

                <BankFeedsFinancialInstitutions
                  onUpdateForm={onUpdateForm}
                  resetAccountInformation={resetAccountInformation}
                  redirectToImportStatements={redirectToImportStatements}
                  setAccountNameRequired={setAccountNameRequired}
                  setAccountNumberRequired={setAccountNumberRequired}
                  setAccountSuffixRequired={setAccountSuffixRequired}
                  setAccountTypeRequired={setAccountTypeRequired}
                  setApplicationPreference={setApplicationPreference}
                  setBranchNameRequired={setBranchNameRequired}
                  setBSBBankRequired={setBSBBankRequired}
                  setBSBBranchRequired={setBSBBranchRequired}
                  setBSBRequired={setBSBRequired}
                  setLastFourDigitsRequired={setLastFourDigitsRequired}
                  setModalState={setModalState}
                  setNameOnCardRequired={setNameOnCardRequired}
                  setNotes={setNotes}
                  setOnlineApplicationSupported={setOnlineApplicationSupported}
                  setPaperApplicationSupported={setPaperApplicationSupported}
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
      </FormTemplate>
    </div>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(BankFeedsCreateView);
