import { Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getShowBankDetails, getShowCashFlow } from '../accountDetailSelectors';
import AccountCashFlowClassification from './AccountCashFlowClassification';
import AccountName from './AccountName';
import AccountNotes from './AccountNotes';
import AccountNumber from './AccountNumber';
import AccountOpeningBalance from './AccountOpeningBalance';
import AccountTaxCode from './AccountTaxCode';
import DetailAccountTypeSection from './DetailAccountTypeSection';
import IsInactive from './IsInactive';
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
    <DetailAccountTypeSection onChange={onAccountTypeChange} />
    <ParentHeaderSelect onChange={onAccountChange} />
    <AccountNumber
      onChange={onAccountNumberChange}
      onBlur={onAccountNumberBlur}
    />
    <AccountName onChange={onAccountChange} />
    <AccountOpeningBalance onChange={onAccountChange} />
    <AccountTaxCode onChange={onAccountChange} />
    <AccountNotes onChange={onAccountChange} />
    {showCashFlow && (
      <AccountCashFlowClassification onChange={onAccountChange} />
    )}
    <IsInactive onChange={onAccountChange} />
    {showBankDetails && (
      <React.Fragment>
        <Separator />
        <BankSectionComponent onChange={onBankDetailsChange} />
      </React.Fragment>
    )}
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  showCashFlow: getShowCashFlow(state),
  showBankDetails: getShowBankDetails(state),
});

export default connect(mapStateToProps)(DetailView);
