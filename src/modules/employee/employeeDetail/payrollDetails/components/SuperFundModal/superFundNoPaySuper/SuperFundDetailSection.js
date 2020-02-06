import {
  Input, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperFund, getSuperProducts } from '../../../selectors/SuperFundModalSelectors';
import AbnInput from '../../../../../../../components/autoFormatter/AbnInput/AbnInput';
import SuperFundProductCombobox from '../SuperFundProductCombobox';
import handleAmountInputChange from '../../../../../../../components/handlers/handleAmountInputChange';
import handleInputChange from '../../../../../../../components/handlers/handleInputChange';

const SuperFundDetailSection = ({
  superProducts,
  superFund: {
    name,
    superProductId,
    superProductAbn,
    employerMembershipNumber,
  },
  superFundModalListeners: {
    onUpdateSuperFundDetail,
    onSelectSuperFund,
  },
}) => (
  <>
    <SuperFundProductCombobox
      label="Fund name"
      hideLabel={false}
      items={superProducts}
      selectedId={superProductId}
      onChange={onSelectSuperFund}
      hintText="Please select a superannuation fund"
    />
    <Input
      name="name"
      label="Name"
      value={name}
      maxLength={76}
      onChange={handleInputChange(onUpdateSuperFundDetail)}
    />
    <ReadOnly label="SPIN/USI" name="usi">{superProductId}</ReadOnly>
    <AbnInput
      name="superProductAbn"
      label="ABN"
      value={superProductAbn}
      onChange={handleAmountInputChange(onUpdateSuperFundDetail)}
    />
    <Input
      name="employerMembershipNumber"
      label="Employer membership no."
      value={employerMembershipNumber}
      maxLength={30}
      onChange={handleInputChange(onUpdateSuperFundDetail)}
    />
  </>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  superProducts: getSuperProducts(state),
});

export default connect(mapStateToProps)(SuperFundDetailSection);
