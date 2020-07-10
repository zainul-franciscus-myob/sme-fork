import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getSuperFundDetailSectionProps } from '../SuperFundNoPaySuperSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import SuperFundProductCombobox from '../../components/SuperFundProductCombobox';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onAbnInputChange = (handler) => (e) => {
  const { rawValue: value, name: key } = e.target;
  handler({ key, value });
};

const onComboBoxChange = (handler) => (item) => handler(item);

const SuperFundDetailSection = ({
  name,
  superProducts,
  superProductId,
  superProductAbn,
  employerMembershipNumber,
  listeners,
}) => (
  <Fragment>
    <SuperFundProductCombobox
      label="Fund name"
      hideLabel={false}
      items={superProducts}
      selectedId={superProductId}
      onChange={onComboBoxChange(listeners.onUpdateSuperProduct)}
      hintText="Please select a superannuation fund"
    />
    <Input
      name="name"
      label="Name"
      value={name}
      maxLength={76}
      requiredLabel="Name is required"
      onChange={onInputChange(listeners.onUpdateSuperFundDetail)}
    />
    <Input
      name="spinUsi"
      label="SPIN/USI"
      value={superProductId}
      maxLength={30}
      disabled
    />
    <AbnInput
      name="superProductAbn"
      label="Fund ABN"
      value={superProductAbn}
      onChange={onAbnInputChange(listeners.onUpdateSuperFundDetail)}
    />
    <Input
      name="employerMembershipNumber"
      label="Employer membership no."
      value={employerMembershipNumber}
      maxLength={30}
      onChange={onInputChange(listeners.onUpdateSuperFundDetail)}
    />
  </Fragment>
);

const mapStateToProps = (state) => getSuperFundDetailSectionProps(state);

export default connect(mapStateToProps)(SuperFundDetailSection);
