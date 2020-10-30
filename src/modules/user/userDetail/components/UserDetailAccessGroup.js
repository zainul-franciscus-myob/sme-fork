import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  FieldGroup,
  Icons,
  RadioButton,
  RadioButtonGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getMyDotMyobLink,
  getShowAccessMessage,
  getShowAdvisorRoleAlert,
  getUserDetails,
} from '../userDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './UserDetailAccessGroup.module.css';

const onRadioButtonChange = (handler) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value: value === 'true' });
};

const UserDetailAccessGroup = ({
  isCreating,
  roles,
  isReadOnly,
  isAdmin,
  isOnlineAdministrator,
  isAdvisor,
  showReadOnly,
  onUserDetailsChange,
  onUserRolesChange,
  myDotMyobLink,
  showAccessMessage,
  showAdvisorRoleAlert,
}) => {
  const openMyMyob = () =>
    window.open(myDotMyobLink, '_blank', 'noopener noreferrer');

  const rolesAndPermsField = (
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
  );

  const rolesAndPermsReadOnly = (
    <Field
      label="Roles and permissions"
      renderField={() =>
        roles
          .filter((role) => role.selected)
          .map((role) => <div className={styles.readOnlyRole}>{role.name}</div>)
      }
    />
  );

  const rolesAndPerms = !(isCreating && isAdvisor)
    ? rolesAndPermsField
    : rolesAndPermsReadOnly;

  const advisorRoleAlert = showAdvisorRoleAlert && (
    <Field
      renderField={() => (
        <Alert type="warning">
          By removing the Administrator role, your advisor will have issues
          accessing your file.
        </Alert>
      )}
    />
  );

  const accessLevel = !isCreating && (
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
  );

  const businessAccessRadioGroup = (
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
        />,
        <RadioButton
          key="2"
          name="isOnlineAdministrator"
          label="All businesses with this serial number"
          value="true"
          checked={isOnlineAdministrator}
          onChange={onRadioButtonChange(onUserDetailsChange)}
        />,
      ]}
    />
  );

  const businessAccessReadOnly = (
    <ReadOnly label="Business access" name="isOnlineAdministrator">
      {isOnlineAdministrator
        ? 'All businesses with this serial number'
        : 'This business'}
    </ReadOnly>
  );

  const businessAccessGroup =
    isCreating && !isAdvisor
      ? businessAccessRadioGroup
      : businessAccessReadOnly;

  const accessMessage = showAccessMessage && (
    <Field
      renderField={() => (
        <Alert type="info">
          Advisors will get access to all businesses with this serial number.
        </Alert>
      )}
    />
  );

  const myMyobLink = !(isCreating && isAdvisor) && (
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
  );

  return (
    <FieldGroup label="Access">
      {rolesAndPerms}
      {advisorRoleAlert}
      {accessLevel}
      {businessAccessGroup}
      {accessMessage}
      {myMyobLink}
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  ...getUserDetails(state),
  myDotMyobLink: getMyDotMyobLink(state),
  showAccessMessage: getShowAccessMessage(state),
  showAdvisorRoleAlert: getShowAdvisorRoleAlert(state),
});

export default connect(mapStateToProps)(UserDetailAccessGroup);
