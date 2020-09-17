import {
  Checkbox,
  CheckboxGroup,
  FilterBar,
  Icons,
  Popover,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIncludeClosedTransactionLabel,
  getMatchTransactionFilterOptions,
  getShowAllFilters,
  getShowIncludeClosedCheckbox,
} from '../matchTransactionSelectors';
import FilterBarSearch from '../../../../../components/FilterBarSearch/FilterBarSearch';
import FilterGroup from '../../../../../components/Feelix/FilterBar/FilterGroup';
import MatchTransactionShowType from '../../../types/MatchTransactionShowType';
import handleAutoCompleteChange from '../../../../../components/handlers/handleAutoCompleteChange';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import styles from './MatchTransactionOptions.module.css';

const MatchTransactionOptions = (props) => {
  const {
    renderMatchTransactionContactCombobox,
    filterOptions: { showType, contactId, keywords, includeClosed },
    showAllFilters,
    includedClosedTransactionLabel,
    showIncludeClosedCheckbox,
    onUpdateMatchTransactionOptions,
    onResetMatchTransactionOptions,
  } = props;

  const Body = () => (
    <div className={styles.typeInfoPopover}>
      <p>
        <strong>Close matches</strong> +/- 180 days from the bank transaction
        date and +/- $0.10.
      </p>
      <p>
        <strong>All transactions</strong> +/- 365 days from the bank transaction
        date.
      </p>
      <p>
        <strong>Selected Transactions</strong> Review selected MYOB
        transactions.
      </p>
    </div>
  );

  const typeInfoPopOver = (
    <Popover body={<Popover.Body child={<Body />} />} closeOnOuterAction>
      <Icons.Info />
    </Popover>
  );

  return (
    <FilterBar
      onReset={onResetMatchTransactionOptions}
      className={styles.filterOptions}
    >
      <Select
        label="Show"
        name="showType"
        value={showType}
        labelAccessory={typeInfoPopOver}
        onChange={handleSelectChange(onUpdateMatchTransactionOptions)}
      >
        <Select.Option
          value={MatchTransactionShowType.CLOSE_MATCHES}
          label="Close matches"
        />
        <Select.Option
          value={MatchTransactionShowType.ALL}
          label="All transactions"
        />
        <Select.Option value="seperator" label="───────────" disabled />
        <Select.Option
          value={MatchTransactionShowType.SELECTED}
          label="Selected transactions"
        />
      </Select>
      {showAllFilters && (
        <FilterGroup>
          {renderMatchTransactionContactCombobox({
            label: 'Contact',
            selectedId: contactId,
            name: 'contactId',
            onChange: handleAutoCompleteChange(
              'contactId',
              onUpdateMatchTransactionOptions
            ),
            hintText: 'All',
            allowClear: true,
            hideAdd: true,
            width: 'xl',
          })}
          {showIncludeClosedCheckbox && (
            <CheckboxGroup
              label="Include closed transactions"
              hideLabel
              renderCheckbox={() => (
                <Checkbox
                  name="includeClosed"
                  label={includedClosedTransactionLabel}
                  checked={includeClosed}
                  onChange={handleCheckboxChange(
                    onUpdateMatchTransactionOptions
                  )}
                />
              )}
            />
          )}
          <FilterBarSearch
            name="keywords"
            label="Search"
            id="search"
            maxLength={255}
            value={keywords}
            onChange={handleInputChange(onUpdateMatchTransactionOptions)}
          />
        </FilterGroup>
      )}
    </FilterBar>
  );
};

const mapStateToProps = (state) => ({
  filterOptions: getMatchTransactionFilterOptions(state),
  showAllFilters: getShowAllFilters(state),
  includedClosedTransactionLabel: getIncludeClosedTransactionLabel(state),
  showIncludeClosedCheckbox: getShowIncludeClosedCheckbox(state),
});

export default connect(mapStateToProps)(MatchTransactionOptions);
