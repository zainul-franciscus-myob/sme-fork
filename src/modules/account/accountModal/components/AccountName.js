import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountName } from '../accountModalSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import style from './AccountName.module.css';

const AccountName = ({ accountName, onChange }) => (
  <Input
    className={style.name}
    name="accountName"
    label="Account name"
    value={accountName}
    onChange={handleInputChange(onChange)}
  />
);

const mapStateToProps = state => ({
  accountName: getAccountName(state),
});

export default connect(mapStateToProps)(AccountName);
