import { connect } from 'react-redux';
import React from 'react';

import { getRecurringScheduleOptions } from '../selectors/RecurringInvoiceSelectors';
import RecurringScheduleWrapper from '../../components/RecurringScheduleWrapper';

const RecurringInvoiceScheduleOptions = (props) => (
  <RecurringScheduleWrapper {...props} />
);

const mapStateToProps = (state) => getRecurringScheduleOptions(state);

export default connect(mapStateToProps)(RecurringInvoiceScheduleOptions);
