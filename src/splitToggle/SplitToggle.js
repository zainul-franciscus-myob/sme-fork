import { SplitFactory } from '@splitsoftware/splitio';

import Config from '../Config';

export default class SplitToggle {
  CONTROL_STATE = 'control'

  TOGGLE_ON = 'on'

  init = ({
    businessId,
  }) => {
    const client = SplitFactory({
      core: {
        authorizationKey: Config.SPLIT_IO_API_KEY,
        key: businessId,
      },
      startup: {
        requestTimeoutBeforeReady: 1,
        retriesOnFailureBeforeReady: 2,
        readyTimeout: 1.5,
      },
      storage: {
        type: 'LOCALSTORAGE',
        prefix: 'MYOB-SMEP',
      },
    }).client();

    return new Promise((resolve) => {
      client.on(client.Event.SDK_READY, () => {
        this.client = client;
        resolve();
      });

      client.on(client.Event.SDK_READY_TIMED_OUT, () => {
        resolve();
      });
    });
  }

  isToggleOn(toggleName) {
    if (this.client) {
      return this.client.getTreatment(toggleName, {}) === this.TOGGLE_ON;
    }

    return false;
  }

  reset() {
    if (this.client) {
      this.client.destroy();
      this.client = null;
    }
  }
}
