import React from 'react';

import LoadingFailPageState from '../../../../../../components/PageView/LoadingFailPageState';

export default class DoneStepModule {
  // TODO: To be implemented in NZPR-414
  constructor({ store }) {
    this.store = store;
  }

  getView = () => {
    return <LoadingFailPageState />;
  };
}
