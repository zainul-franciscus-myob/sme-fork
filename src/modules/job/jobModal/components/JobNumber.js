import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getJobNumber } from '../JobModalSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const JobNumber = ({
  number,
  onChange,
}) => (
  <Input
    name="number"
    label="Job number"
    requiredLabel="This is required"
    value={number}
    onChange={handleInputChange(onChange)}
    width="md"
  />
);

const mapStateToProps = state => ({
  number: getJobNumber(state),
});

export default connect(mapStateToProps)(JobNumber);
