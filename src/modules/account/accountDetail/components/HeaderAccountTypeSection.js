import { ReadOnly, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountClassification,
  getAccountClassificationforDisplay,
  getAccountClassifications,
  getIsClassificationHeaderAccount,
  getIsReadOnlyHeaderAccountType,
} from '../accountDetailSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const AccountTypes = ({ options }) => options
  .map(({ displayName, value }) => (
    <Select.Option value={value} label={displayName} key={value} />
  ));

const HeaderAccountTypeSection = ({
  accountClassifications,
  accountClassification,
  onChange,
  disabled,
  isReadOnly,
  accountClassificationforDisplay,
}) => (isReadOnly ? (
  <ReadOnly label="Account type" name="type">
    {accountClassificationforDisplay}
  </ReadOnly>
) : (
  <Select
    name="accountClassification"
    label="Account type"
    value={accountClassification}
    requiredLabel="This is required"
    onChange={handleSelectChange(onChange)}
    disabled={disabled}
    width="md"
  >
    <Select.Option hidden value="" label="Select an option" key="blank" />
    <AccountTypes options={accountClassifications} />
  </Select>
));

const mapStateToProps = state => ({
  accountClassifications: getAccountClassifications(state),
  accountClassification: getAccountClassification(state),
  accountClassificationforDisplay: getAccountClassificationforDisplay(state),
  disabled: getIsClassificationHeaderAccount(state),
  isReadOnly: getIsReadOnlyHeaderAccountType(state),
});

export default connect(mapStateToProps)(HeaderAccountTypeSection);
