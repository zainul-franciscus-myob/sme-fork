import { RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAccountCategoryDisabled,
  getIsHeader,
} from '../accountDetailSelectors';

const accountCategoryValues = {
  detail: 'Detail account',
  header: 'Header account',
};

const onCategoryChange = (handler) => (e) => {
  const value = e.value === accountCategoryValues.header.toString();

  handler({
    key: 'isHeader',
    value,
  });
};

const AccountCategory = ({ accountCategory, onChange, disabled }) => (
  <RadioButtonGroup
    name="accountCategory"
    label="Account category"
    value={accountCategory}
    disabled={disabled}
    options={[accountCategoryValues.detail, accountCategoryValues.header]}
    onChange={onCategoryChange(onChange)}
  />
);

const mapStateToProps = (state) => ({
  accountCategory: getIsHeader(state) ? 'Header account' : 'Detail account',
  disabled: getIsAccountCategoryDisabled(state),
});

export default connect(mapStateToProps)(AccountCategory);
