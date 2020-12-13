import { connect } from 'react-redux';
import React from 'react';

import { getScheduleOptions } from '../RecurringTransactionModalSelectors';
import RecurringScheduleOptions from '../../components/RecurringScheduleOptions';

const RecurringTransactionModalSchedule = (props) => (
  <RecurringScheduleOptions {...props} />
);

const mapStateToProps = (state) => getScheduleOptions(state);

export default connect(mapStateToProps)(RecurringTransactionModalSchedule);
