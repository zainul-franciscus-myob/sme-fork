import React from 'react';

import LeaveTabView from './components/LeaveTabView';
import createLeaveDispatcher from './createLeaveDispatcher';

export default class LeaveModule {
  constructor({ store } = {}) {
    this.dispatcher = createLeaveDispatcher(store);

    this.view = <LeaveTabView onLeaveChange={this.dispatcher.updateLeaveDetails} />;
  }

  getView() {
    return (this.view);
  }
}
