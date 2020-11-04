import { ReadOnly, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsParentHeaderDisabled,
  getParentAccountId,
  getParentAccountName,
  getParentAccountsForType,
} from '../accountDetailSelectors';
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
  parentAccountName,
}) => {
  return isSelectDisabled ? (
    <ReadOnly label="Parent header" name="parentAccountName">
      {parentAccountName}
    </ReadOnly>
  ) : (
    <Select
      name="parentAccountId"
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
};

const mapStateToProps = (state) => ({
  parentAccounts: getParentAccountsForType(state),
  parentAccount: getParentAccountId(state),
  isSelectDisabled: getIsParentHeaderDisabled(state),
  parentAccountName: getParentAccountName(state),
});

export default connect(mapStateToProps)(ParentHeaderSelect);
