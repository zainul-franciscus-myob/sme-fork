import React from 'react';

import LeaveTabView from './components/LeaveTabView';
import leaveDispatcher from './leaveDispatcher';

export default class LeaveNzModule {
  constructor({ store }) {
    this.dispatcher = leaveDispatcher(store);
  }

  getView() {
    return (
      <LeaveTabView
        onLeaveChange={this.dispatcher.updateLeaveDetails}
        onHolidayPayBlur={this.dispatcher.updateHolidayPay}
      />
    );
  }
}
