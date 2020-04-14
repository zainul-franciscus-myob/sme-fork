import React from 'react';

import ContactDetailsNzTabView from './components/contactDetailsNzTab';

export default class ContactDetailsNzTabModule {
  constructor() {
    this.view = <ContactDetailsNzTabView />;
  }

  getView() {
    return (this.view);
  }
}
