import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsParentHeaderDisabled,
  getParentAccount,
  getParentAccountsForType,
} from '../accountDetailSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import style from './ParentHeaderSelect.module.css';

const buildParentAccounts = headerAccounts => headerAccounts.map(({ displayName, id }) => (
  <Select.Option value={id} label={displayName} key={id} />
));

const ParentHeaderSelect = ({
  parentAccounts,
  parentAccount,
  onChange,
  isSelectDisabled,
}) => (
  <Select
    className={style.header}
    name="parentAccountId"
    disabled={isSelectDisabled}
    label="Parent header"
    value={parentAccount}
    requiredLabel="This is required"
    onChange={handleSelectChange(onChange)}
  >
    {[
      <Select.Option hidden value="" label="Select an option" key="blank" />,
    ].concat(buildParentAccounts(parentAccounts))}
  </Select>
);

const mapStateToProps = state => ({
  parentAccounts: getParentAccountsForType(state),
  parentAccount: getParentAccount(state),
  isSelectDisabled: getIsParentHeaderDisabled(state),
});

export default connect(mapStateToProps)(ParentHeaderSelect);
