import React from 'react';

import PreparePaySlipsView from './components/PreparePaySlipsView';
import createPayRunDispatchers from '../createPayRunDispatchers';

export default class PreparePaySlipsSubModule {
  constructor({ store }) {
    this.store = store;
    this.dispatcher = createPayRunDispatchers(this.store);
  }

  render() {
    return <PreparePaySlipsView onNextClick={this.dispatcher.nextStep} />;
  }
}
