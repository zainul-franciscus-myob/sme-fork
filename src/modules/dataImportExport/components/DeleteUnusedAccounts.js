import { Alert, Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDeleteUnusedAccounts } from '../selectors/DataImportExportSelectors';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import styles from './DeleteUnusedAccounts.module.css';

const DeleteUnusedAccounts = ({
  onDeleteUnusedAccountsChange,
  deleteUnusedAccounts,
}) => {
  const alertMessage =
    "Existing accounts that haven't been used in transactions will be deleted. System and linked accounts won't be deleted.";
  const learnMoreUrl = 'https://help.myob.com/wiki/x/GLFqAg';
  return (
    <React.Fragment>
      <CheckboxGroup
        label="Delete unused accounts"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            name="deleteUnusedAccounts"
            label="Delete unused accounts"
            checked={deleteUnusedAccounts}
            onChange={handleCheckboxChange(onDeleteUnusedAccountsChange)}
          />
        )}
      />
      {deleteUnusedAccounts && (
        <div className={styles.deleteAccountsDangerAlert}>
          <Alert type="danger">
            {alertMessage}
            <br />
            <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Alert>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  deleteUnusedAccounts: getDeleteUnusedAccounts(state),
});

export default connect(mapStateToProps)(DeleteUnusedAccounts);
