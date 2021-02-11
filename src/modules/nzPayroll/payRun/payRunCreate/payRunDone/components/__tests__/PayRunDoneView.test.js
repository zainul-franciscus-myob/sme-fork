import { PageState, SignOutIcon } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { DONE } from '../../../payRunSteps';
import { LOAD_PAYDAY_ONBOARDED_STATUS } from '../../../PayRunIntents';
import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import PayRunDoneView from '../PayRunDoneView';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('PayRunDoneView', () => {
  let store;
  const props = (isPaydayFilingEnabled) => {
    return {
      onCloseButtonClick: () => {},
      isPaydayFilingEnabled,
    };
  };
  const initialState = {
    startPayRun: {
      currentEditingPayRun: {
        paymentDate: '3029-12-12',
      },
    },
    step: DONE,
    payDayOnboardedStatus: {
      isBusinessOnboarded: true,
      isUserOnboarded: false,
    },
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer, initialState);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('when view is rendered', () => {
    it('should display correct pay on date in text message', () => {
      const wrapper = mountWithProvider(<PayRunDoneView {...props} />);
      const expected = 'Make sure your employees are paid by 12/12/3029.';
      const actual = wrapper.find(PageState).prop('description');
      expect(actual).toEqual(expected);
    });

    it('should not display external link icon for Payday filing report redirect button if Payday feature disabled', () => {
      const wrapper = mountWithProvider(<PayRunDoneView {...props(false)} />);
      const button = findButtonWithTestId(wrapper, 'paydayFilingReportButton');
      expect(button).toEqual({});
    });

    describe('PayDay Filing is enabled', () => {
      it('should display external link icon for Payday filing report redirect button if Payday feature enabled', () => {
        const wrapper = mountWithProvider(<PayRunDoneView {...props(true)} />);
        const button = findButtonWithTestId(
          wrapper,
          'paydayFilingReportButton'
        );
        expect(button.find(SignOutIcon)).toHaveLength(1);
      });

      it('should display correct message when business and user are onboarded', () => {
        const wrapper = mountWithProvider(<PayRunDoneView {...props(true)} />);
        const expected = 'Pay run recorded and sent to Inland Revenue';
        store.dispatch({
          intent: LOAD_PAYDAY_ONBOARDED_STATUS,
          payDayOnboardedStatus: {
            isBusinessOnboarded: true,
            isUserOnboarded: true,
          },
        });
        wrapper.update();
        const actual = wrapper.find(PageState).prop('title');
        expect(actual).toEqual(expected);
      });
    });
  });
});
