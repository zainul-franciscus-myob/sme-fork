import React from 'react';

import LeaveTabView from './components/LeaveTabView';
import leaveDispatcher from './leaveDispatcher';

export default class LeaveModule {
  constructor({ store } = {}) {
    this.dispatcher = leaveDispatcher(store);

    this.view = (
      <LeaveTabView onLeaveChange={this.dispatcher.updateLeaveDetails} />
    );
  }

  getView() {
    return this.view;
  }
}
