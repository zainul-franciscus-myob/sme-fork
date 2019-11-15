import { ReadOnly, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountClassificationforDisplay,
  getAccountClassifications,
  getAccountType,
} from '../accountModalSelectors';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import style from './AccountTypeSection.module.css';

const AccountTypes = ({ options }) => options.map(({ displayName, value, type }) => (type ? (
  <Select.OptionGroup value={value} label={displayName} key={value}>
    {type.map(({ displayName: subDisplayName, value: subValue }) => (
      <Select.Option
        value={subValue}
        label={subDisplayName}
        key={subValue}
      />
    ))}
  </Select.OptionGroup>
) : (
  <Select.Option value={value} label={displayName} key={value} />
)));

const AccountTypeSection = ({
  accountClassifications,
  accountType,
  accountClassificationforDisplay,

  onChange,
}) => (
  <React.Fragment>
    <ReadOnly label="Account classification" name="type">
      {accountClassificationforDisplay}
    </ReadOnly>
    <Select
      className={style.type}
      name="accountType"
      label="Account type"
      value={accountType}
      requiredLabel="This is required"
      onChange={handleSelectChange(onChange)}
    >
      <Select.Option hidden value="" label="Select an option" key="blank" />
      <AccountTypes options={accountClassifications} />
    </Select>
  </React.Fragment>
);

const mapStateToProps = state => ({
  accountClassifications: getAccountClassifications(state),
  accountClassificationforDisplay: getAccountClassificationforDisplay(state),
  accountType: getAccountType(state),
});

export default connect(mapStateToProps)(AccountTypeSection);
