import { FieldGroup, ReadOnly } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessDetailSelectors';

const FinancialYearSection = ({
  financialYear, lastMonthInFinancialYear, accountingPeriods, openingBalanceDate,
}) => (
  <FieldGroup label="Financial year">
    <ReadOnly name="financialYear" label="Current financial year">
      {financialYear}
    </ReadOnly>
    <ReadOnly name="lastMonthInFinancialYear" label="Last month in financial year">
      {lastMonthInFinancialYear}
    </ReadOnly>
    <ReadOnly name="accountingPeriods" label="Accounting period">
      {accountingPeriods}
    </ReadOnly>
    <ReadOnly name="openingBalanceDate" label="Opening balance date">
      {openingBalanceDate}
    </ReadOnly>
  </FieldGroup>
);

FinancialYearSection.propTypes = {
  financialYear: PropTypes.string.isRequired,
  lastMonthInFinancialYear: PropTypes.string.isRequired,
  accountingPeriods: PropTypes.string.isRequired,
  openingBalanceDate: PropTypes.string.isRequired,
};

const mapStateToProps = state => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
