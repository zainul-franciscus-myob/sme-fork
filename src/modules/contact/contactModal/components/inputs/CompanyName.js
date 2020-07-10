import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCompanyName } from '../../ContactModalSelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const CompanyName = ({ companyName, onChange }) => (
  <Input
    name="companyName"
    label="Company name"
    requiredLabel="This is required"
    value={companyName}
    onChange={handleInputChange(onChange)}
  />
);

const mapStateToProps = (state) => ({
  companyName: getCompanyName(state),
});

export default connect(mapStateToProps)(CompanyName);
