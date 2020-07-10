import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountName } from '../accountModalSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const AccountName = ({ accountName, onChange }) => (
  <Input
    name="accountName"
    label="Account name"
    requiredLabel="This is required"
    value={accountName}
    onChange={handleInputChange(onChange)}
    width="xl"
  />
);

const mapStateToProps = (state) => ({
  accountName: getAccountName(state),
});

export default connect(mapStateToProps)(AccountName);
