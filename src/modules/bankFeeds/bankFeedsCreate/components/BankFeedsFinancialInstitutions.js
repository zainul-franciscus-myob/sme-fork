import {
  Button,
  Combobox,
  Modal,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountType,
  getBankAccounts,
  getCreditCardAccounts,
  getIsModalOpen,
} from '../BankFeedsCreateSelectors';

const FinancialInstitutions = ({
  accountType,
  bankAccounts,
  creditCardAccounts,
  resetAccountInformation,
  setAccountNameRequired,
  setAccountNumberRequired,
  setAccountSuffixRequired,
  setAccountTypeRequired,
  setBranchNameRequired,
  setBSBBankRequired,
  setBSBBranchRequired,
  setBSBRequired,
  setLastFourDigitsRequired,
  setNameOnCardRequired,
  setNotes,
  setOnlineApplicationSupported,
  setPaperApplicationSupported,
}) => (
  <fieldset>
    <Combobox
      items={accountType === 'Trading Account' ? bankAccounts : creditCardAccounts}
      label="Financial institution"
      metaData={[{ columnName: 'description', showData: true }]}
      name="financialInstitution"
      noMatchFoundMessage="No match found"
      onChange={(value) => {
        resetAccountInformation();

        if (value.accountNameRequired) setAccountNameRequired();
        if (value.accountNumberRequired) setAccountNumberRequired();
        if (value.accountSuffixRequired) setAccountSuffixRequired();
        if (value.accountTypeRequired) setAccountTypeRequired();
        if (value.branchNameRequired) setBranchNameRequired();
        if (value.BSBBankRequired) setBSBBankRequired();
        if (value.BSBBranchRequired) setBSBBranchRequired();
        if (value.BSBRequired) setBSBRequired();
        if (value.nameOnCardRequired) setNameOnCardRequired();
        if (value.lastFourDigitsRequired) setLastFourDigitsRequired();
        if (value.notes) setNotes(value.notes);
        if (value.onlineApplicationSupported) setOnlineApplicationSupported(true);
        if (value.paperApplicationSupported) setPaperApplicationSupported(true);
      }}
      requiredLabel="This field is required"
    />
  </fieldset>
);

const NoFinancialInstitution = ({
  isModalOpen,
  redirectToImportStatements,
  setModalState,
}) => (
  <>
    <fieldset>
      <ReadOnly hideLabel label="No financial institution" name="noFinancialInstitution">
        <Button type="link" onClick={setModalState}>My bank is not listed</Button>
      </ReadOnly>
    </fieldset>

    {
      isModalOpen
        ? <Modal onCancel={setModalState} size="small" title="My bank is not listed">
            <Modal.Body>
              <p>
                Can&apos;t find your bank on the list?
                Then it seems your bank doesn&apos;t currently support bank feeds.
              </p>

              You will need to import bank and credit card statements instead.
            </Modal.Body>

            <Modal.Footer>
              <button type="button" className="btn btn-default" onClick={setModalState}>Go back</button>
              <button type="button" className="btn btn-primary" onClick={redirectToImportStatements}>Import statements</button>
            </Modal.Footer>
          </Modal>
        : null
    }
  </>
);

const BankFeedsFinancialInstitutions = ({
  accountType,
  bankAccounts,
  creditCardAccounts,
  isModalOpen,
  redirectToImportStatements,
  resetAccountInformation,
  setAccountNameRequired,
  setAccountNumberRequired,
  setAccountSuffixRequired,
  setAccountTypeRequired,
  setBranchNameRequired,
  setBSBBankRequired,
  setBSBBranchRequired,
  setBSBRequired,
  setLastFourDigitsRequired,
  setModalState,
  setNameOnCardRequired,
  setNotes,
  setOnlineApplicationSupported,
  setPaperApplicationSupported,
}) => (
  <>
    <FinancialInstitutions
      accountType={accountType}
      bankAccounts={bankAccounts}
      creditCardAccounts={creditCardAccounts}
      resetAccountInformation={resetAccountInformation}
      setAccountNameRequired={setAccountNameRequired}
      setAccountNumberRequired={setAccountNumberRequired}
      setAccountSuffixRequired={setAccountSuffixRequired}
      setAccountTypeRequired={setAccountTypeRequired}
      setBranchNameRequired={setBranchNameRequired}
      setBSBBankRequired={setBSBBankRequired}
      setBSBBranchRequired={setBSBBranchRequired}
      setBSBRequired={setBSBRequired}
      setLastFourDigitsRequired={setLastFourDigitsRequired}
      setNameOnCardRequired={setNameOnCardRequired}
      setNotes={setNotes}
      setOnlineApplicationSupported={setOnlineApplicationSupported}
      setPaperApplicationSupported={setPaperApplicationSupported}
    />

    <NoFinancialInstitution
      isModalOpen={isModalOpen}
      redirectToImportStatements={redirectToImportStatements}
      setModalState={setModalState}
    />
  </>
);

const mapStateToProps = state => ({
  accountType: getAccountType(state),
  bankAccounts: getBankAccounts(state),
  creditCardAccounts: getCreditCardAccounts(state),
  isModalOpen: getIsModalOpen(state),
});

export default connect(mapStateToProps)(BankFeedsFinancialInstitutions);
