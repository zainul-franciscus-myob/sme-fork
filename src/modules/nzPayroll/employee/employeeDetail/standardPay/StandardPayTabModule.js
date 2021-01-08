import React from 'react';

import StandardPayTab from './components/StandardPayTab';
import standardPayTabDispatchers from './standardPayTabDispatchers';

export default class StandardPayTabModule {
  constructor({ store }) {
    this.dispatcher = standardPayTabDispatchers(store);
  }

  getView() {
    return (
      <StandardPayTab onWageDetailsChange={this.dispatcher.updateWageDetails} />
    );
  }
}
