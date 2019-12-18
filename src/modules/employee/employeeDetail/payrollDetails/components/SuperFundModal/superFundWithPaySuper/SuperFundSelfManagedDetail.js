import {
  ReadOnly, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getElectronicServiceAddresses,
  getIsAbnLoading,
  getSuperFund,
} from '../../../selectors/SuperFundModalSelectors';
import AbnInput from '../../../../../../../components/autoFormatter/AbnInput/AbnInput';
import AccountNumberInput
  from '../../../../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import ESACombobox from './ESACombobox';
import handleAmountInputChange from '../../../../../../../components/handlers/handleAmountInputChange';
import styles from './SuperFundSelfManagedDetail.module.css';

const onSEAComboboxChange = handler => (item) => {
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
    <div className={styles.abn}>
      <AbnInput
        name="superProductAbn"
        label="Fund ABN"
        value={superFund.superProductAbn}
        onBlur={onAbnLookUp}
        onChange={handleAmountInputChange(onUpdateSelfManagedFundAbn)}
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
    <BSBInput name="bankNumber" label="BSB" value={superFund.bankNumber} onChange={handleAmountInputChange(onUpdateSuperFundDetail)} />
    <AccountNumberInput name="accountNumber" label="Account number" value={superFund.accountNumber} onChange={handleAmountInputChange(onUpdateSuperFundDetail)} />
  </>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  electronicServiceAddresses: getElectronicServiceAddresses(state),
  isAbnLoading: getIsAbnLoading(state),
});

export default connect(mapStateToProps)(SuperFundSelfManagedDetail);
