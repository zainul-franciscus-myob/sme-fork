import {
  Checkbox,
  CheckboxGroup,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContacts,
  getIncludeClosedTransactionLabel,
  getMatchTransactionFilterOptions,
  getShowAllFilters,
  getShowIncludeClosedCheckbox,
} from '../bankingSelectors/matchTransactionSelectors';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import FilterBar from '../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../components/FilterBarSearch/FilterBarSearch';
import FilterGroup from '../../../components/Feelix/FilterBar/FilterGroup';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './BankingView.module.css';

const showTypes = [
  { label: 'Close matches', value: 'closeMatches' },
  { label: 'Last 90 days', value: 'last90Days' },
  { label: 'All transactions', value: 'all' },
  { label: 'Selected transactions', value: 'selected' },
];

const MatchTransactionOptions = (props) => {
  const {
    contacts,
    filterOptions: {
      showType,
      contactId,
      keywords,
      includeClosed,
    },
    onApplyMatchTransactionOptions,
    onUpdateMatchTransactionOptions,
    showAllFilters,
    includedClosedTransactionLabel,
    showIncludeClosedCheckbox,
  } = props;

  return (
    <div className={styles.filterOptions}>
      <FilterBar onApply={onApplyMatchTransactionOptions}>
        <Select
          label="Show"
          name="showType"
          value={showType}
          onChange={handleSelectChange(onUpdateMatchTransactionOptions)}
        >
          {
            showTypes.map(({ label, value }) => (
              <Select.Option key={value} value={value} label={label} />
            ))
          }
        </Select>
        {
          showAllFilters && (
            <FilterGroup>
              <ContactCombobox
                label="Contact"
                items={contacts}
                selectedId={contactId}
                name="contactId"
                onChange={handleComboboxChange('contactId', onUpdateMatchTransactionOptions)}
                hintText="All"
                allowClear
                hasAllItem
              />
              {
                showIncludeClosedCheckbox && (
                  <CheckboxGroup
                    label="Include closed transactions"
                    hideLabel
                    renderCheckbox={() => (
                      <Checkbox
                        name="includeClosed"
                        label={includedClosedTransactionLabel}
                        checked={includeClosed}
                        onChange={handleCheckboxChange(onUpdateMatchTransactionOptions)}
                      />
                    )}
                  />
                )
              }
              <FilterBarSearch name="keywords" label="Search" id="search" maxLength={255} value={keywords} onChange={handleInputChange(onUpdateMatchTransactionOptions)} />
            </FilterGroup>
          )
        }
      </FilterBar>
    </div>
  );
};

const mapStateToProps = state => ({
  filterOptions: getMatchTransactionFilterOptions(state),
  contacts: getContacts(state),
  showAllFilters: getShowAllFilters(state),
  includedClosedTransactionLabel: getIncludeClosedTransactionLabel(state),
  showIncludeClosedCheckbox: getShowIncludeClosedCheckbox(state),
});

export default connect(mapStateToProps)(MatchTransactionOptions);
