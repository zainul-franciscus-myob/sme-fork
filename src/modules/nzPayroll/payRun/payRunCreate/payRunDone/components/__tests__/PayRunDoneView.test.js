import { PageState } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { DONE } from '../../../payRunSteps';
import PayRunDoneView from '../PayRunDoneView';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('PayRunDoneView', () => {
  let store;
  const props = {
    onCloseButtonClick: () => {},
  };
  const initialState = {
    startPayRun: {
      currentEditingPayRun: {
        paymentDate: '3029-12-12',
      },
    },
    step: DONE,
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
  });
});
