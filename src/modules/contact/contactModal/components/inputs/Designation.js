import { RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDesignation } from '../../ContactModalSelectors';
import handleRadioButtonChange from '../../../../../components/handlers/handleRadioButtonChange';

const Designation = ({ designation, onChange }) => (
  <RadioButtonGroup
    label="Entity type"
    name="entityType"
    options={['Company', 'Individual']}
    onChange={handleRadioButtonChange('designation', onChange)}
    value={designation}
  />
);

const mapStateToProps = state => ({
  designation: getDesignation(state),
});

export default connect(mapStateToProps)(Designation);
