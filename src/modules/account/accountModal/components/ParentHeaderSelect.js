import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsParentHeaderDisabled,
  getParentAccount,
  getParentAccountsForType,
} from '../accountModalSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const buildParentAccounts = (headerAccounts) =>
  headerAccounts.map(({ displayName, id }) => (
    <Select.Option value={id} label={displayName} key={id} />
  ));

const ParentHeaderSelect = ({
  parentAccounts,
  parentAccount,
  onChange,
  isSelectDisabled,
}) => (
  <Select
    name="parentAccountId"
    disabled={isSelectDisabled}
    label="Parent header"
    value={parentAccount}
    requiredLabel="This is required"
    onChange={handleSelectChange(onChange)}
    width="xl"
  >
    {[
      <Select.Option hidden value="" label="Select an option" key="blank" />,
    ].concat(buildParentAccounts(parentAccounts))}
  </Select>
);

const mapStateToProps = (state) => ({
  parentAccounts: getParentAccountsForType(state),
  parentAccount: getParentAccount(state),
  isSelectDisabled: getIsParentHeaderDisabled(state),
});

export default connect(mapStateToProps)(ParentHeaderSelect);
