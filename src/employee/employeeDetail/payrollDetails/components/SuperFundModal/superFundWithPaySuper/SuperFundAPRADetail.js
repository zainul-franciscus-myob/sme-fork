import {
  Input, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getSuperFund,
  getSuperProducts,
} from '../../../selectors/SuperFundModalSelectors';
import AbnInput from '../../../../../../components/autoFormatter/AbnInput/AbnInput';
import SuperFundProductCombobox from '../SuperFundProductCombobox';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const SuperFundAPRADetail = ({
  superFund,
  superFundModalListeners: {
    onUpdateSuperFundDetail,
    onSelectSuperFund,
  },
  superProducts,
}) => (
  <>
    <SuperFundProductCombobox
      label="Fund name"
      hideLabel={false}
      items={superProducts}
      selectedId={superFund.superProductId}
      onChange={onSelectSuperFund}
      hintText="Please select a superannuation fund"
    />
    <ReadOnly label="SPIN/USI" name="usi">{superFund.superProductId}</ReadOnly>
    <AbnInput name="superProductAbn" label="Fund ABN" disabled value={superFund.superProductAbn} />
    <Input
      name="employerMembershipNumber"
      label="Employer membership no."
      value={superFund.employerMembershipNumber}
      maxLength={30}
      onChange={onInputChange(onUpdateSuperFundDetail)}
    />
  </>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  superProducts: getSuperProducts(state),
});

export default connect(mapStateToProps)(SuperFundAPRADetail);
