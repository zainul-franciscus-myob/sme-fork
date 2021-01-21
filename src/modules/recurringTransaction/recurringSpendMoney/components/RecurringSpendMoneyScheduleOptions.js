import { connect } from 'react-redux';
import React from 'react';

import { getRecurringScheduleOptions } from '../RecurringSpendMoneySelectors';
import RecurringScheduleWrapper from '../../components/RecurringScheduleWrapper';

const RecurringSpendMoneyScheduleOptions = (props) => (
  <RecurringScheduleWrapper {...props} />
);

const mapStateToProps = (state) => getRecurringScheduleOptions(state);

export default connect(mapStateToProps)(RecurringSpendMoneyScheduleOptions);
