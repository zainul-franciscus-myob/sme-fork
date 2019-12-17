import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActive } from '../accountDetailSelectors';

const onInactiveChange = handler => (e) => {
  const { checked } = e.target;
  handler({ key: 'isActive', value: !checked });
};

const IsInactive = ({ isInactive, onChange }) => (
  <CheckboxGroup
    label="Inactive account"
    hideLabel
    renderCheckbox={() => (
      <Checkbox
        name="isInactive"
        label="Inactive account"
        checked={isInactive}
        onChange={onInactiveChange(onChange)}
      />
    )}
  />
);

const mapStateToProps = state => ({
  isInactive: !getIsActive(state),
});

export default connect(mapStateToProps)(IsInactive);
