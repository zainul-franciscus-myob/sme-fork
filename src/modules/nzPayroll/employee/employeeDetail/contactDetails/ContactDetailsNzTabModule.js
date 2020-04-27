import React from 'react';

import ContactDetailsNzTabView from './components/contactDetailsNzTab';
import createContactDetailsTabDispatchers from './createContactDetailsTabDispatchers';

export default class ContactDetailsNzTabModule {
  constructor({
    store,
  }) {
    this.dispatcher = createContactDetailsTabDispatchers(store);
  }

  getView() {
    return (
      <ContactDetailsNzTabView
        onContactDetailsChange={this.dispatcher.updateContactDetails}
      />
    );
  }
}
