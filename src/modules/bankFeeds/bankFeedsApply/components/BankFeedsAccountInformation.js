import { Alert, Input } from '@myob/myob-widgets';
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
  getLastFourDigits,
  getLastFourDigitsRequired,
  getNameOnCard,
  getNameOnCardRequired,
  getNotes,
} from '../BankFeedsApplySelectors';
import AccountNumberInput from '../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import BankFeedsCreditCard from './BankFeedsCreditCard';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const BankFeedsAccountInformation = ({
  accountName,
  accountNameRequired,
  accountNumber,
  accountNumberRequired,
  accountSuffix,
  accountSuffixRequired,
  accountType,
  applicationPreference,
  branchName,
  branchNameRequired,
  bsb,
  bsbBank,
  bsbBankRequired,
  bsbBranch,
  bsbBranchRequired,
  bsbRequired,
  lastFourDigits,
  lastFourDigitsRequired,
  nameOnCard,
  nameOnCardRequired,
  notes,
  onUpdateForm,
}) =>
  applicationPreference &&
  applicationPreference !== 'online' && (
    <>
      <hr />

      {accountType === 'Trading Account' ? (
        <legend>Account information</legend>
      ) : (
        <legend>Credit card information</legend>
      )}

      {notes && (
        <Alert type="info" inline>
          {notes}
        </Alert>
      )}

      {accountNameRequired && (
        <Input
          label="Account holder name"
          name="accountName"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          type="text"
          value={accountName}
        />
      )}

      {bsbRequired && (
        <BSBInput
          label="BSB"
          name="bsb"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          value={bsb}
          width="xs"
        />
      )}

      {bsbBankRequired && (
        <Input
          label="BSB bank"
          name="bsbBank"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          type="text"
          value={bsbBank}
        />
      )}

      {bsbBranchRequired && (
        <Input
          label="BSB branch"
          name="bsbBranch"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          type="text"
          value={bsbBranch}
        />
      )}

      {accountNumberRequired && (
        <AccountNumberInput
          label="Account number"
          name="accountNumber"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          value={accountNumber}
        />
      )}

      {accountSuffixRequired && (
        <Input
          label="Account suffix"
          name="accountSuffix"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          type="number"
          value={accountSuffix}
          width="sm"
        />
      )}

      {branchNameRequired && (
        <Input
          label="Branch name"
          name="branchName"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          type="text"
          value={branchName}
        />
      )}

      {nameOnCardRequired && (
        <Input
          label="Name on card"
          name="nameOnCard"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          type="text"
          value={nameOnCard}
        />
      )}

      <BankFeedsCreditCard
        lastFourDigits={lastFourDigits}
        lastFourDigitsRequired={lastFourDigitsRequired}
        onUpdateForm={onUpdateForm}
      />
    </>
  );

const mapStateToProps = (state) => ({
  accountName: getAccountName(state),
  accountNameRequired: getAccountNameRequired(state),
  accountNumber: getAccountNumber(state),
  accountNumberRequired: getAccountNumberRequired(state),
  accountSuffix: getAccountSuffix(state),
  accountSuffixRequired: getAccountSuffixRequired(state),
  accountType: getAccountType(state),
  accountTypeRequired: getAccountTypeRequired(state),
  applicationPreference: getApplicationPreference(state),
  branchName: getBranchName(state),
  branchNameRequired: getBranchNameRequired(state),
  bsb: getBsb(state),
  bsbBank: getBsbBank(state),
  bsbBankRequired: getBsbBankRequired(state),
  bsbBranch: getBsbBranch(state),
  bsbBranchRequired: getBsbBranchRequired(state),
  bsbRequired: getBsbRequired(state),
  lastFourDigits: getLastFourDigits(state),
  lastFourDigitsRequired: getLastFourDigitsRequired(state),
  nameOnCard: getNameOnCard(state),
  nameOnCardRequired: getNameOnCardRequired(state),
  notes: getNotes(state),
});

export default connect(mapStateToProps)(BankFeedsAccountInformation);
