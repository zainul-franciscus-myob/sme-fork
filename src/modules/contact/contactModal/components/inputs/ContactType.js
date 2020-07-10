import { RadioButton, RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactType,
  getContactTypeOptions,
} from '../../ContactModalSelectors';
import handleRadioButtonChange from '../../../../../components/handlers/handleRadioButtonChange';

const ContactType = ({ contactType, contactTypeOptions, onChange }) => (
  <RadioButtonGroup
    label="Contact type"
    requiredLabel="This is required"
    name="contactType"
    onChange={handleRadioButtonChange('contactType', onChange)}
    renderRadios={({ id, value, ...props }) =>
      contactTypeOptions.map((item) => (
        <RadioButton
          {...props}
          checked={item.value === contactType}
          key={item.value}
          value={item.value}
          label={item.name}
        />
      ))
    }
  />
);

const mapStateToProps = (state) => ({
  contactType: getContactType(state),
  contactTypeOptions: getContactTypeOptions(state),
});

export default connect(mapStateToProps)(ContactType);
