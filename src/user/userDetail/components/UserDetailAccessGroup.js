import {
  Checkbox,
  CheckboxGroup,
  Field,
  FieldGroup,
  RadioButton,
  RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getUserDetails } from '../userDetailSelectors';

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const onRadioButtonChange = handler => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value: value === 'true' });
};

const UserDetailAccessGroup = ({
  isCreating,
  roles,
  isReadOnly,
  isAdmin,
  isOnlineAdministrator,
  onUserDetailsChange,
  onUserRolesChange,
}) => (
  <FieldGroup label="Access">
    <CheckboxGroup
      label="Select what access to give this user"
      renderCheckbox={() => roles.map(role => (
        <Checkbox
          key={role.id}
          name={role.id}
          label={role.name}
          checked={role.selected}
          onChange={onCheckboxChange(onUserRolesChange)}
        />))
      }
    />
    <Field
      label="User access help"
      hideLabel
      renderField={() => <a href="https://my.myob.com" target="_blank" rel="noopener noreferrer">Learn about user access</a>}
    />
    {
      !isCreating
      && (
        <React.Fragment>
          <RadioButtonGroup
            label="Access Type"
            name="isReadOnly"
            renderRadios={() => [
              <RadioButton
                key="1"
                name="isReadOnly"
                label="Create and edit"
                value="false"
                checked={!isReadOnly}
                onChange={onRadioButtonChange(onUserDetailsChange)}
                disabled={!isCreating && isAdmin}
              />,
              <RadioButton
                key="2"
                name="isReadOnly"
                label="Read only"
                value="true"
                checked={isReadOnly}
                onChange={onRadioButtonChange(onUserDetailsChange)}
                disabled={!isCreating && isAdmin}
              />]}
          />
          <Field
            label="Business access help"
            hideLabel
            renderField={() => <a href="https://my.myob.com" target="_blank" rel="noopener noreferrer">Learn more</a>}
          />
        </React.Fragment>
      )
    }
    {
      isCreating
      && (
        <React.Fragment>
          <RadioButtonGroup
            label="Businesses they can access"
            name="isAdmin"
            renderRadios={() => [
              <RadioButton
                key="1"
                name="isOnlineAdministrator"
                label="Just this business"
                value="false"
                checked={!isOnlineAdministrator}
                onChange={onRadioButtonChange(onUserDetailsChange)}
              />,
              <RadioButton
                key="2"
                name="isOnlineAdministrator"
                label="All businesses under this serial number"
                value="true"
                checked={isOnlineAdministrator}
                onChange={onRadioButtonChange(onUserDetailsChange)}
              />]}
          />
          <Field
            label="Business access help"
            hideLabel
            renderField={() => <a href="https://my.myob.com" target="_blank" rel="noopener noreferrer">Learn more</a>}
          />
        </React.Fragment>
      )
    }
  </FieldGroup>
);

UserDetailAccessGroup.propTypes = {
  onUserDetailsChange: PropTypes.func.isRequired,
  onUserRolesChange: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isOnlineAdministrator: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};

const mapStateToProps = state => getUserDetails(state);

export default connect(mapStateToProps)(UserDetailAccessGroup);
