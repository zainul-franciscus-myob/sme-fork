import { connect } from 'react-redux';
import React from 'react';

import { getRecurringScheduleOptions } from '../selectors/RecurringBillSelectors';
import RecurringScheduleWrapper from '../../components/RecurringScheduleWrapper';

const RecurringBillScheduleOptions = (props) => (
  <RecurringScheduleWrapper {...props} />
);

const mapStateToProps = (state) => getRecurringScheduleOptions(state);

export default connect(mapStateToProps)(RecurringBillScheduleOptions);
