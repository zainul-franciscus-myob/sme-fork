import { Input } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessDetailSelectors';

const FinancialYearSection = ({
  financialYear, lastMonthInFinancialYear, accountingPeriods, openingBalanceDate,
}) => (
  <div>
    <h2>Financial year</h2>
    <Input
      name="financialYear"
      label="Current financial year"
      disabled
      value={financialYear}
    />
    <Input
      name="lastMonthInFinancialYear"
      label="Last month in financial year"
      disabled
      value={lastMonthInFinancialYear}
    />
    <Input
      name="accountingPeriods"
      label="Accounting period"
      disabled
      value={accountingPeriods}
    />
    <Input
      name="openingBalanceDate"
      label="Opening balance date"
      disabled
      value={openingBalanceDate}
    />
  </div>
);

FinancialYearSection.propTypes = {
  financialYear: PropTypes.string.isRequired,
  lastMonthInFinancialYear: PropTypes.string.isRequired,
  accountingPeriods: PropTypes.string.isRequired,
  openingBalanceDate: PropTypes.string.isRequired,
};

const mapStateToProps = state => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
