import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getJobName } from '../JobModalSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const JobName = ({ jobName, onChange }) => (
  <Input
    name="name"
    label="Job name"
    value={jobName}
    onChange={handleInputChange(onChange)}
  />
);

const mapStateToProps = (state) => ({
  accountName: getJobName(state),
});

export default connect(mapStateToProps)(JobName);
