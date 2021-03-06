import { Input, ReadOnly, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getElectronicServiceAddresses,
  getIsAbnLoading,
  getSuperFund,
} from '../../../selectors/SuperFundModalSelectors';
import AbnInput from '../../../../../../../components/autoFormatter/AbnInput/AbnInput';
import AccountNumberInput from '../../../../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import ESACombobox from './ESACombobox';
import handleAmountInputChange from '../../../../../../../components/handlers/handleAmountInputChange';
import handleInputChange from '../../../../../../../components/handlers/handleInputChange';
import styles from './SuperFundSelfManagedDetail.module.css';

const onSEAComboboxChange = (handler) => (item) => {
  handler({ key: 'electronicServiceAddress', value: item.name });
};

const SuperFundSelfManagedDetail = ({
  superFund,
  superFundModalListeners: {
    onUpdateSuperFundDetail,
    onAbnLookUp,
    onUpdateSelfManagedFundAbn,
  },
  electronicServiceAddresses,
  isAbnLoading,
}) => (
  <>
    <div>
      <AbnInput
        name="superProductAbn"
        label="Fund ABN"
        value={superFund.superProductAbn}
        onBlur={onAbnLookUp}
        onChange={handleAmountInputChange(onUpdateSelfManagedFundAbn)}
        requiredLabel="Fund ABN is required"
      />
      <div className={styles.abnLoader}>
        {isAbnLoading && <Spinner size="small" />}
      </div>
    </div>
    <ReadOnly name="superProductName" label="Fund name">
      {superFund.superProductName}
    </ReadOnly>
    <Input
      name="name"
      label="Name"
      value={superFund.name}
      maxLength={76}
      onChange={handleInputChange(onUpdateSuperFundDetail)}
      disabled={isAbnLoading}
      requiredLabel="Name is required"
    />
    <ESACombobox
      label="ESA"
      hideLabel={false}
      items={electronicServiceAddresses}
      selectedId={superFund.electronicServiceAddress}
      onChange={onSEAComboboxChange(onUpdateSuperFundDetail)}
      requiredLabel="ESA is required"
    />
    <BSBInput
      name="bankNumber"
      label="BSB"
      value={superFund.bankNumber}
      requiredLabel="BSB is required"
      onChange={handleAmountInputChange(onUpdateSuperFundDetail)}
    />
    <AccountNumberInput
      name="accountNumber"
      label="Account number"
      value={superFund.accountNumber}
      requiredLabel="Account number is required"
      onChange={handleAmountInputChange(onUpdateSuperFundDetail)}
    />
  </>
);

const mapStateToProps = (state) => ({
  superFund: getSuperFund(state),
  electronicServiceAddresses: getElectronicServiceAddresses(state),
  isAbnLoading: getIsAbnLoading(state),
});

export default connect(mapStateToProps)(SuperFundSelfManagedDetail);
