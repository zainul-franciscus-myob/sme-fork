import {
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAbnIsDisabled,
  getIsAbnLoading,
  getSuperFund,
  getSuperProducts,
} from '../../../selectors/SuperFundModalSelectors';
import AbnInput from '../../../../../../../components/autoFormatter/AbnInput/AbnInput';
import SuperFundProductCombobox from '../SuperFundProductCombobox';
import handleInputChange from '../../../../../../../components/handlers/handleInputChange';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const SuperFundAPRADetail = ({
  superFund,
  isAbnLoading,
  superFundModalListeners: {
    onUpdateSuperFundDetail,
    onSelectSuperFund,
  },
  superProducts,
  abnIsDisabled,
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
    <Input
      name="name"
      label="Name"
      value={superFund.name}
      maxLength={76}
      onChange={handleInputChange(onUpdateSuperFundDetail)}
      disabled={isAbnLoading}
      requiredLabel="Name is required"
    />
    <Input label="SPIN/USI" name="usi" value={superFund.superProductId} disabled />
    <AbnInput
      name="superProductAbn"
      label="Fund ABN"
      disabled={abnIsDisabled}
      value={superFund.superProductAbn}
    />
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
  isAbnLoading: getIsAbnLoading(state),
  abnIsDisabled: getAbnIsDisabled(state),
});

export default connect(mapStateToProps)(SuperFundAPRADetail);
