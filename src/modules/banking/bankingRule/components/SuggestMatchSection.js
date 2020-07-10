import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactId,
  getContactLabel,
  getContacts,
  getMatchSectionHeader,
} from '../bankingRuleSelectors';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './SuggestMatchSection.module.css';

const SuggestMatchSection = ({
  onDetailsChange,
  contactId,
  contacts,
  label,
  header,
}) => (
  <FieldGroup label={header}>
    <div className={styles.suggestMatch}>
      <ContactCombobox
        items={contacts}
        selectedId={contactId}
        label={label}
        requiredLabel="required"
        onChange={handleComboboxChange('contactId', onDetailsChange)}
      />
    </div>
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  contacts: getContacts(state),
  contactId: getContactId(state),
  label: getContactLabel(state),
  header: getMatchSectionHeader(state),
});

export default connect(mapStateToProps)(SuggestMatchSection);
