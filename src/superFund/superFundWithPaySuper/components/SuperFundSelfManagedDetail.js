import {
  ReadOnly, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getElectronicServiceAddresses, getIsAbnLoading,
  getSuperFund,
} from '../SuperFundWithPaySuperSelectors';
import AbnInput from '../../../components/autoFormatter/AbnInput/AbnInput';
import AccountNumberInput
  from '../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../components/autoFormatter/BankDetailsInput/BSBInput';
import ESACombobox from './ESACombobox';
import styles from './SuperFundSelfManagedDetail.module.css';

const onAutoFormatInputChange = handler => (e) => {
  const { rawValue, name } = e.target;
  handler({ key: name, value: rawValue });
};

const onSEAComboboxChange = handler => (item) => {
  handler({ key: 'electronicServiceAddress', value: item.name });
};

const SuperFundSelfManagedDetail = ({
  superFund,
  listeners: { onUpdateSuperFundDetail, onAbnLookUp, onUpdateSelfManagedFundAbn },
  electronicServiceAddresses,
  isAbnLoading,
}) => (
  <React.Fragment>
    <div className={styles.abn}>
      <AbnInput
        name="superProductAbn"
        label="Fund ABN"
        value={superFund.superProductAbn}
        onBlur={onAbnLookUp}
        onChange={onAutoFormatInputChange(onUpdateSelfManagedFundAbn)}
      />
      <div className={styles.abnLoader}>
        { isAbnLoading && <Spinner size="small" />}
      </div>
    </div>
    <ReadOnly name="superProductName" label="Fund name">{superFund.superProductName}</ReadOnly>
    <ESACombobox
      label="ESA"
      hideLabel={false}
      items={electronicServiceAddresses}
      selectedId={superFund.electronicServiceAddress}
      onChange={onSEAComboboxChange(onUpdateSuperFundDetail)}
    />
    <BSBInput name="bankNumber" label="BSB" value={superFund.bankNumber} onChange={onAutoFormatInputChange(onUpdateSuperFundDetail)} />
    <AccountNumberInput name="accountNumber" label="Account number" value={superFund.accountNumber} onChange={onAutoFormatInputChange(onUpdateSuperFundDetail)} />
  </React.Fragment>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  electronicServiceAddresses: getElectronicServiceAddresses(state),
  isAbnLoading: getIsAbnLoading(state),
});

export default connect(mapStateToProps)(SuperFundSelfManagedDetail);
