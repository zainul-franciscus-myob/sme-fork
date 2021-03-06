import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactId,
  getContactLabel,
  getMatchSectionHeader,
} from '../bankingRuleSelectors';
import handleContactAutoCompleteChange from '../../../../components/handlers/handleContactAutoCompleteChange';
import styles from './SuggestMatchSection.module.css';

const SuggestMatchSection = ({
  onContactChange,
  onAlert,
  renderContactCombobox,
  contactId,
  label,
  header,
}) => (
  <FieldGroup label={header}>
    <div className={styles.suggestMatch}>
      {renderContactCombobox({
        selectedId: contactId,
        label,
        requiredLabel: 'This is required',
        hideLabel: false,
        allowClear: true,
        onChange: handleContactAutoCompleteChange('contactId', onContactChange),
        onAlert,
        width: 'xl',
      })}
    </div>
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  contactId: getContactId(state),
  label: getContactLabel(state),
  header: getMatchSectionHeader(state),
});

export default connect(mapStateToProps)(SuggestMatchSection);
