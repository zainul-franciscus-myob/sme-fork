import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  NEXT_STEP,
  RECORD_PAYMENTS,
  SET_ALERT,
  SET_EMPLOYEE_PAYMENTS,
  SET_LOADING_STATE,
} from '../../PayRunIntents';
import { findButtonWithTestId } from '../../../../../../common/tests/selectors';
import AlertType from '../../types/AlertType';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import RecordPayRunModule from '../RecordPayRunModule';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import payRunReducer from '../../payRunReducer';
import recordPayments from '../../../mappings/data/payRun/recordPayments';

describe('RecordPayRunModule', () => {
  const constructRecordPayRunModule = () => {
    const store = new TestStore(payRunReducer);
    const integration = new TestIntegration();

    const recordPayRunModule = new RecordPayRunModule({
      integration,
      store,
    });

    const view = recordPayRunModule.render();

    const wrappedView = <Provider store={store}>{view}</Provider>;

    const wrapper = mount(wrappedView);

    wrapper.update();
    return {
      store,
      integration,
      wrapper,
    };
  };

  describe('Record button', () => {
    it('sets employee payments when integration is successful', () => {
      const { store, integration, wrapper } = constructRecordPayRunModule();

      integration.mapSuccess(RECORD_PAYMENTS, recordPayments);

      const recordButton = findButtonWithTestId(wrapper, 'saveButton');
      recordButton.simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_ALERT,
          alert: undefined,
        },
        {
          intent: SET_EMPLOYEE_PAYMENTS,
          response: recordPayments,
        },
        {
          intent: NEXT_STEP,
        },
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: RECORD_PAYMENTS,
          urlParams: { businessId: undefined },
          params: undefined,
        })
      );
    });

    it('displays an alert message when integration is unsuccessful', () => {
      const { store, integration, wrapper } = constructRecordPayRunModule();

      const message = 'this failed!';
      const type = AlertType.ERROR;

      integration.mapFailure(RECORD_PAYMENTS, { message });

      const recordButton = findButtonWithTestId(wrapper, 'saveButton');
      recordButton.simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_ALERT,
          alert: { type, message },
        },
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: RECORD_PAYMENTS,
          urlParams: { businessId: undefined },
          params: undefined,
        })
      );
    });
  });
});
