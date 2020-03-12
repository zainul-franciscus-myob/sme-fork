import { Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getShowBankDetails,
  getShowCashFlow,
} from '../accountModalSelectors';
import AccountCashFlowClassification from './AccountCashFlowClassification';
import AccountName from './AccountName';
import AccountNotes from './AccountNotes';
import AccountNumber from './AccountNumber';
import AccountTaxCode from './AccountTaxCode';
import AccountTypeSection from './AccountTypeSection';
import ParentHeaderSelect from './ParentHeaderSelect';

const DetailView = ({
  showCashFlow,
  showBankDetails,
  onBankDetailsChange,
  bankSectionComponent: BankSectionComponent,
  onAccountChange,
  onAccountNumberChange,
  onAccountNumberBlur,
  onAccountTypeChange,
}) => (
  <React.Fragment>
    <AccountTypeSection onChange={onAccountTypeChange} />
    <ParentHeaderSelect onChange={onAccountChange} />
    <AccountNumber
      onChange={onAccountNumberChange}
      onBlur={onAccountNumberBlur}
    />
    <AccountName onChange={onAccountChange} />
    <AccountTaxCode onChange={onAccountChange} />
    <AccountNotes onChange={onAccountChange} />
    {showCashFlow && (
      <AccountCashFlowClassification onChange={onAccountChange} />
    )}
    {showBankDetails && (
    <React.Fragment>
      <Separator />
      <BankSectionComponent onChange={onBankDetailsChange} />
    </React.Fragment>
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  showCashFlow: getShowCashFlow(state),
  showBankDetails: getShowBankDetails(state),
});

export default connect(mapStateToProps)(DetailView);
