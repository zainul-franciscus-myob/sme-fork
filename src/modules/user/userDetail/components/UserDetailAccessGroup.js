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
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldEnableUserType,
  getShouldShowManageMydotUserLink,
  getShouldShowUserTypeOptions,
  getShowAccessMessage,
  getShowAdvisorRoleAlert,
  getUserDetails,
  getUserTypeOptions,
} from '../userDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './UserDetailAccessGroup.module.css';

const onRadioButtonChange = (handler) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value: value === 'true' });
};

const UserDetailAccessGroup = ({
  enableUserType,
  isCreating,
  roles,
  isReadOnly,
  isAdmin,
  isAdvisor,
  showReadOnly,
  newUserType,
  onUserDetailsChange,
  onUserRolesChange,
  onMyMyobClick,
  showAccessMessage,
  showAdvisorRoleAlert,
  showMyMyobLink,
  userTypeOptions,
}) => {
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

  const userTypeSelect = (
    <Select
      label="User Type"
      name="newUserType"
      value={newUserType}
      onChange={handleSelectChange(onUserDetailsChange)}
      width="sm"
      disabled={!enableUserType || (isCreating && isAdvisor)}
    >
      {userTypeOptions.map(({ name, value }) => (
        <Select.Option key={value} value={value} label={name} />
      ))}
    </Select>
  );

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
          onClick={onMyMyobClick}
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
      {userTypeSelect}
      {accessMessage}
      {showMyMyobLink && myMyobLink}
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  ...getUserDetails(state),
  showAccessMessage: getShowAccessMessage(state),
  showAdvisorRoleAlert: getShowAdvisorRoleAlert(state),
  showMyMyobLink: getShouldShowManageMydotUserLink(state),
  enableUserType: getShouldEnableUserType(state),
  showUserTypeOptions: getShouldShowUserTypeOptions(state),
  userTypeOptions: getUserTypeOptions(state),
});

export default connect(mapStateToProps)(UserDetailAccessGroup);
