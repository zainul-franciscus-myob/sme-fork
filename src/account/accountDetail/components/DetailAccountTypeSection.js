import { ReadOnly, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountClassificationforDisplay,
  getAccountClassificationsForDetail,
  getAccountType,
  getAccountTypeforDisplay,
  getShowReadOnlyAccountType,
} from '../accountDetailSelectors';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import style from './AccountTypeSection.module.css';

const AccountTypes = ({ options }) => options
  .map(({ displayName, value, type }) => (type ? (
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

const DetailAccountTypeSection = ({
  accountClassifications,
  accountType,
  accountClassificationforDisplay,
  showReadOnlyAccountType,
  accountTypeforDisplay,
  onChange,
}) => (
  <React.Fragment>
    <ReadOnly label="Account classification" name="type">
      {accountClassificationforDisplay}
    </ReadOnly>
    {showReadOnlyAccountType ? (
      <ReadOnly label="Account type" name="type">
        {accountTypeforDisplay}
      </ReadOnly>
    ) : (
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
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  accountClassifications: getAccountClassificationsForDetail(state),
  accountClassificationforDisplay: getAccountClassificationforDisplay(state),
  accountType: getAccountType(state),
  showReadOnlyAccountType: getShowReadOnlyAccountType(state),
  accountTypeforDisplay: getAccountTypeforDisplay(state),
});

export default connect(mapStateToProps)(DetailAccountTypeSection);
