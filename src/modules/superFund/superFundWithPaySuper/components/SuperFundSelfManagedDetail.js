import { Input, ReadOnly, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getElectronicServiceAddresses, getIsAbnLoading, getIsCreating,
  getSuperFund,
} from '../SuperFundWithPaySuperSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import AccountNumberInput
  from '../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import ESACombobox from './ESACombobox';
import styles from './SuperFundSelfManagedDetail.module.css';

const onAutoFormatInputChange = handler => (e) => {
  const { rawValue, name } = e.target;
  handler({ key: name, value: rawValue });
};

const onSEAComboboxChange = handler => (item) => {
  handler({ key: 'electronicServiceAddress', value: item.name });
};

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const SuperFundSelfManagedDetail = ({
  superFund,
  listeners: { onUpdateSuperFundDetail, onAbnLookUp, onUpdateSelfManagedFundAbn },
  electronicServiceAddresses,
  isAbnLoading,
  isCreating,
}) => (
  <React.Fragment>
    <div className={styles.abn}>
      <AbnInput
        name="superProductAbn"
        label="Fund ABN"
        value={superFund.superProductAbn}
        onBlur={onAbnLookUp}
        disabled={!isCreating}
        requiredLabel="Fund ABN is required"
        onChange={onAutoFormatInputChange(onUpdateSelfManagedFundAbn)}
      />
      <div className={styles.abnLoader}>
        { isAbnLoading && <Spinner size="small" />}
      </div>
    </div>
    <ReadOnly name="superProductName" label="Fund name">{superFund.superProductName}</ReadOnly>
    <Input
      name="name"
      label="Name"
      value={superFund.name}
      maxLength={76}
      disabled={!isCreating || isAbnLoading}
      requiredLabel="Name is required"
      onChange={onInputChange(onUpdateSuperFundDetail)}
    />
    <ESACombobox
      label="ESA"
      hideLabel={false}
      items={electronicServiceAddresses}
      selectedId={superFund.electronicServiceAddress}
      disabled={!isCreating}
      requiredLabel="ESA is required"
      onChange={onSEAComboboxChange(onUpdateSuperFundDetail)}
    />
    <BSBInput name="bankNumber" label="BSB" value={superFund.bankNumber} requiredLabel="BSB is required" onChange={onAutoFormatInputChange(onUpdateSuperFundDetail)} disabled={!isCreating} />
    <AccountNumberInput name="accountNumber" label="Account number" value={superFund.accountNumber} requiredLabel="Account number is required" onChange={onAutoFormatInputChange(onUpdateSuperFundDetail)} disabled={!isCreating} />
  </React.Fragment>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  electronicServiceAddresses: getElectronicServiceAddresses(state),
  isAbnLoading: getIsAbnLoading(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(SuperFundSelfManagedDetail);
