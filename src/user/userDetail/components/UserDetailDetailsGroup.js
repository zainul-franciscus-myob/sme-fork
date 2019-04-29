import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getUserDetails } from '../userDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const UserDetailDetailsGroup = ({
  userName,
  email,
  isInactive,
  isCreating,
  isAdmin,
  onUserDetailsChange,
}) => (
  <FieldGroup label="Details">
    <Input
      name="userName"
      label="Name"
      value={userName}
      onChange={onInputChange(onUserDetailsChange)}
      disabled={!isCreating}
    />
    <Input
      name="email"
      label="Email"
      value={email}
      onChange={onInputChange(onUserDetailsChange)}
    />
    {
      !isCreating
      && (
        <CheckboxGroup
          label=""
          renderCheckbox={() => (
            <Checkbox
              key="isInactive"
              name="isInactive"
              label="Inactive User"
              checked={isInactive}
              onChange={onCheckboxChange(onUserDetailsChange)}
              disabled={!isCreating && isAdmin}
            />)
          }
        />
      )
    }
  </FieldGroup>
);

UserDetailDetailsGroup.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onUserDetailsChange: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isInactive: PropTypes.bool.isRequired,
};

const mapStateToProps = state => getUserDetails(state);

export default connect(mapStateToProps)(UserDetailDetailsGroup);
