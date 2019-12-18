import React from 'react';

import EmployeeDetailContactDetails from './components/ContactDetailsTab';
import createStartContactDetailsTabDispatchers from './createStartContactDetailsTabDispatchers';

export default class ContactDetailsTabModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createStartContactDetailsTabDispatchers(store);
  }

  getView() {
    return (
      <EmployeeDetailContactDetails
        onContactDetailsChange={this.dispatcher.updateContactDetails}
      />
    );
  }
}
