import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccountNameNz,
  getBankAccountNumberNz,
  getStatementCode,
  getStatementParticulars,
  getStatementReference,
} from '../accountModalSelectors';
import AutoFormatter from '../../../../components/autoFormatter/AutoFormatterCore/AutoFormatter';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import style from './NzBankDetailsSection.module.css';

const handleFormattedInputChange = handler => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue });
};

const AuBankDetailsSection = ({
  accountNumber,
  accountName,
  bankCode,
  onChange,
  particulars,
  reference,
}) => (
  <React.Fragment>
    <AutoFormatter
      className={style.number}
      name="accountNumberNz"
      label="Bank account number"
      value={accountNumber}
      onChange={handleFormattedInputChange(onChange)}
      options={{
        numericOnly: true,
        blocks: [2, 4, 7, 3],
        delimiters: ['-'],
      }}
    />
    <AutoFormatter
      className={style.name}
      onChange={handleFormattedInputChange(onChange)}
      name="accountNameNz"
      label="Bank account name"
      maxLength={20}
      value={accountName}
      options={{
        uppercase: true,
      }}
    />
    <Input
      className={style.particulars}
      onChange={handleInputChange(onChange)}
      name="statementParticulars"
      label="Particulars"
      maxLength={12}
      value={particulars}
    />
    <Input
      maxLength={12}
      className={style.code}
      onChange={handleInputChange(onChange)}
      name="statementCode"
      label="Bank code"
      value={bankCode}
    />
    <Input
      className={style.reference}
      maxLength={12}
      onChange={handleInputChange(onChange)}
      name="statementReference"
      label="Reference"
      value={reference}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  accountNumber: getBankAccountNumberNz(state),
  accountName: getBankAccountNameNz(state),
  bankCode: getStatementCode(state),
  particulars: getStatementParticulars(state),
  reference: getStatementReference(state),
});

export default connect(mapStateToProps)(AuBankDetailsSection);
