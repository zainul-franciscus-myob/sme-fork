import React from 'react';

import PersonalDetailsNzTab from './components/PersonalDetailsNzTab';
import personalDetailsTabDispatchers from './personalDetailsTabDispatchers';

export default class PersonalDetailsNzTabModule {
  constructor({ store }) {
    this.dispatcher = personalDetailsTabDispatchers(store);
  }

  getView() {
    return (
      <PersonalDetailsNzTab
        onPersonalDetailsChange={this.dispatcher.updatepersonalDetails}
      />
    );
  }
}
