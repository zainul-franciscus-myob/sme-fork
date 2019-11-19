import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getUserDetails } from '../userDetailSelectors';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './UserDetailDetailsGroup.module.css';

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
      requiredLabel={isCreating ? 'This is required' : ''}
      value={userName}
      className={styles.textInput}
      onChange={handleInputChange(onUserDetailsChange)}
      disabled={!isCreating}
    />
    <Input
      name="email"
      label="Email"
      requiredLabel={isCreating ? 'This is required' : ''}
      value={email}
      className={styles.textInput}
      onChange={handleInputChange(onUserDetailsChange)}
      disabled={!isCreating}
    />
    {
      !isCreating
      && (
        <CheckboxGroup
          label="isInactive"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              key="isInactive"
              name="isInactive"
              label="Inactive user"
              checked={isInactive}
              onChange={handleCheckboxChange(onUserDetailsChange)}
              disabled={!isCreating && isAdmin}
            />)
          }
        />
      )
    }
  </FieldGroup>
);

const mapStateToProps = state => getUserDetails(state);

export default connect(mapStateToProps)(UserDetailDetailsGroup);
