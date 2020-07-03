import {
  Checkbox,
  CheckboxGroup,
  Icons,
  Popover,
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
import MatchTransactionShowType from '../MatchTransactionShowType';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './MatchTransactionOptions.module.css';

const MatchTransactionOptions = (props) => {
  const {
    contacts,
    filterOptions: {
      showType,
      contactId,
      keywords,
      includeClosed,
    },
    onUpdateMatchTransactionOptions,
    showAllFilters,
    includedClosedTransactionLabel,
    showIncludeClosedCheckbox,
  } = props;

  const Body = () => (
    <div className={styles.typeInfoPopover}>
      <p><strong>
       Close matches
      </strong> +/- 180 days from the bank transaction date and +/- $0.10.</p>
      <p><strong>
       All transactions
      </strong> +/- 365 days from the bank transaction date.</p>
      <p><strong>
       Selected Transactions
      </strong> Review selected MYOB transactions.</p>
    </div>
  );

  const typeInfoPopOver = (<Popover
    body={<Popover.Body child={<Body />} />}
    closeOnOuterAction
  ><Icons.Info /></Popover>);

  return (
    <div className={styles.filterOptions}>
      <FilterBar>
        <Select
          label="Show"
          name="showType"
          value={showType}
          labelAccessory={typeInfoPopOver}
          onChange={handleSelectChange(onUpdateMatchTransactionOptions)}
        >
          <Select.Option value={MatchTransactionShowType.CLOSE_MATCHES} label="Close matches" />
          <Select.Option value={MatchTransactionShowType.ALL} label="All transactions" />
          <Select.Option value="seperator" label="───────────" disabled />
          <Select.Option value={MatchTransactionShowType.SELECTED} label="Selected transactions" />
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
