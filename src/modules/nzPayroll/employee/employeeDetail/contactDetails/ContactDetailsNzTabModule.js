import React from 'react';

import ContactDetailsNzTabView from './components/ContactDetailsNzTabView';
import contactDetailsTabDispatchers from './contactDetailsTabDispatchers';

export default class ContactDetailsNzTabModule {
  constructor({ store }) {
    this.dispatcher = contactDetailsTabDispatchers(store);
  }

  getView() {
    return (
      <ContactDetailsNzTabView
        onContactDetailsChange={this.dispatcher.updateContactDetails}
      />
    );
  }
}
