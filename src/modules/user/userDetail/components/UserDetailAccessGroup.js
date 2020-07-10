import {
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  FieldGroup,
  Icons,
  RadioButton,
  RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getUserDetails } from '../userDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './UserDetailAccessGroup.module.css';

const onRadioButtonChange = (handler) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value: value === 'true' });
};

const openMyMyob = () => window.open('https://my.myob.com');

const UserDetailAccessGroup = ({
  isCreating,
  roles,
  isReadOnly,
  isAdmin,
  isOnlineAdministrator,
  showReadOnly,
  onUserDetailsChange,
  onUserRolesChange,
}) => (
  <FieldGroup label="Access">
    <div className={styles.roles}>
      <CheckboxGroup
        label="Roles and permissions"
        requiredLabel="This is required"
        renderCheckbox={() =>
          roles.map((role) => (
            <Checkbox
              key={role.id}
              name={role.id}
              label={role.name}
              checked={role.selected}
              onChange={handleCheckboxChange(onUserRolesChange)}
            />
          ))
        }
      />
    </div>
    {!isCreating && (
      <RadioButtonGroup
        label="Access level"
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
          showReadOnly && (
            <RadioButton
              key="2"
              name="isReadOnly"
              label="Read only"
              value="true"
              checked={isReadOnly}
              onChange={onRadioButtonChange(onUserDetailsChange)}
              disabled={!isCreating && isAdmin}
            />
          ),
        ]}
      />
    )}
    <RadioButtonGroup
      label="Business access"
      name="isAdmin"
      renderRadios={() => [
        <RadioButton
          key="1"
          name="isOnlineAdministrator"
          label="This business"
          value="false"
          checked={!isOnlineAdministrator}
          onChange={onRadioButtonChange(onUserDetailsChange)}
          disabled={!isCreating}
        />,
        <RadioButton
          key="2"
          name="isOnlineAdministrator"
          label="All businesses with this serial number"
          value="true"
          checked={isOnlineAdministrator}
          onChange={onRadioButtonChange(onUserDetailsChange)}
          disabled={!isCreating}
        />,
      ]}
    />
    <Field
      label="Manage user access via my.MYOB"
      hideLabel
      renderField={() => (
        <Button
          type="link"
          icon={<Icons.OpenExternalLink />}
          iconRight
          onClick={openMyMyob}
        >
          Manage user access via my.MYOB
        </Button>
      )}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => getUserDetails(state);

export default connect(mapStateToProps)(UserDetailAccessGroup);
