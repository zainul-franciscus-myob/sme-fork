import {
  Checkbox,
  CheckboxGroup,
  Icons,
  Input,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccountBsb,
  getBankAccountName,
  getBankAccountNumberAu,
  getBankCode,
  getBankTradingName,
  getCreateABABank,
  getDirectEntryUserId,
  getSelfBalancingTransaction,
} from '../accountDetailSelectors';
import AccountNumberInput from '../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import UpperCaseInputFormatter from '../../../../components/autoFormatter/UpperCaseInput/UpperCaseInputFormatter';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const handleFormattedInputChange = (handler) => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue });
};

const AuBankDetailsSection = ({
  bsb,
  accountNumber,
  accountName,
  tradingName,
  bankCode,
  directEntryUserId,
  createABABank,
  selfBalancingTransaction,
  onChange,
}) => (
  <React.Fragment>
    <BSBInput
      name="bsb"
      label="BSB"
      value={bsb}
      onChange={handleInputChange(onChange)}
      width="xs"
    />
    <AccountNumberInput
      name="accountNumberAu"
      label="Bank account number"
      value={accountNumber}
      onChange={handleFormattedInputChange(onChange)}
      width="sm"
    />
    <UpperCaseInputFormatter
      onChange={handleFormattedInputChange(onChange)}
      name="accountName"
      label="Bank account name"
      maxLength={32}
      value={accountName}
      width="xl"
    />
    <UpperCaseInputFormatter
      onChange={handleFormattedInputChange(onChange)}
      name="companyTradingName"
      label="Company trading name"
      value={tradingName}
      maxLength={16}
      width="xl"
    />
    <CheckboxGroup
      label="Create ABA Bank files"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="createABABank"
          label="I create ABA bank files for this account"
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />}>
              ABA files contain payment details, which you can upload to your
              bank to make batch payments
            </Tooltip>
          }
          checked={createABABank}
          onChange={handleCheckboxChange(onChange)}
        />
      )}
    />
    {createABABank && (
      <React.Fragment>
        <Input
          onChange={handleInputChange(onChange)}
          name="bankCode"
          label="Bank code"
          maxLength={3}
          value={bankCode}
          width="sm"
        />
        <Input
          onChange={handleInputChange(onChange)}
          name="directEntryUserId"
          label="Direct entry user ID"
          maxLength={6}
          value={directEntryUserId}
          width="sm"
        />
        <CheckboxGroup
          label="Self-balancing transaction"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isSelfBalancingTransaction"
              label="Include a self-balancing transaction"
              checked={selfBalancingTransaction}
              onChange={handleCheckboxChange(onChange)}
            />
          )}
        />
      </React.Fragment>
    )}
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  bsb: getBankAccountBsb(state),
  accountNumber: getBankAccountNumberAu(state),
  accountName: getBankAccountName(state),
  tradingName: getBankTradingName(state),
  bankCode: getBankCode(state),
  directEntryUserId: getDirectEntryUserId(state),
  createABABank: getCreateABABank(state),
  selfBalancingTransaction: getSelfBalancingTransaction(state),
});

export default connect(mapStateToProps)(AuBankDetailsSection);
