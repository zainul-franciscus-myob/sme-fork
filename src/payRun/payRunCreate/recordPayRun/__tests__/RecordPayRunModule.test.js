import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import PayRunModule from '../../PayRunModule';
import RecordPayRunModule from '../RecordPayRunModule';

const findButtonWithTestId = (wrapper, testId) => wrapper.findWhere(c => (
  c.prop('testId') === testId && c.name() === 'Button'
));

describe('RecordPayRunModule', () => {
  const constructRecordPayRunModule = () => {
    const integration = {};
    const pushMessage = [];
    const setRootView = () => (<div />);
    const payRunModule = new PayRunModule({ integration, setRootView, pushMessage });

    const employeePayListModule = new RecordPayRunModule({
      integration, store: payRunModule.store, pushMessage,
    });
    const view = employeePayListModule.getView();

    const wrappedView = (
      <Provider store={payRunModule.store}>
        {view}
      </Provider>
    );

    const wrapper = mount(wrappedView);

    wrapper.update();
    return wrapper;
  };

  describe('Save and close button', () => {
    it('renders the Save and close button', () => {
      const wrapper = constructRecordPayRunModule();

      const saveAndCloseButton = findButtonWithTestId(wrapper, 'saveAndCloseButton');

      expect(saveAndCloseButton).toHaveLength(1);
    });

    it('redirects to payRun url, when clicked', () => {
      const wrapper = constructRecordPayRunModule();

      findButtonWithTestId(wrapper, 'saveAndCloseButton').simulate('click');

      expect(window.location.href.endsWith('/payRun')).toBe(true);
    });
  });
});
