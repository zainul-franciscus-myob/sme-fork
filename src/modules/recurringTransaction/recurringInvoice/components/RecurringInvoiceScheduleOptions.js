import { connect } from 'react-redux';
import React from 'react';

import { getRecurringScheduleOptions } from '../selectors/RecurringInvoiceSelectors';
import RecurringScheduleOptions from '../../components/RecurringScheduleOptions';

const RecurringInvoiceScheduleOptions = (props) => (
  <RecurringScheduleOptions {...props} />
);

const mapStateToProps = (state) => getRecurringScheduleOptions(state);

export default connect(mapStateToProps)(RecurringInvoiceScheduleOptions);
