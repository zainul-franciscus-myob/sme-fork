import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import EmployeePayListModule from '../EmployeePayListModule';
import PayRunModule from '../../PayRunModule';

const findButtonWithTestId = (wrapper, testId) => wrapper.findWhere(c => (
  c.prop('testId') === testId && c.name() === 'Button'
));

describe('EmployeePayListModule', () => {
  const constructEmployeePayListModule = () => {
    const integration = {};
    const pushMessage = [];
    const setRootView = () => (<div />);
    const payRunModule = new PayRunModule({ integration, setRootView, pushMessage });

    const employeePayListModule = new EmployeePayListModule({
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
      const wrapper = constructEmployeePayListModule();

      const saveAndCloseButton = findButtonWithTestId(wrapper, 'saveAndCloseButton');

      expect(saveAndCloseButton).toHaveLength(1);
    });

    it('redirects to payRun url, when clicked', () => {
      const wrapper = constructEmployeePayListModule();

      findButtonWithTestId(wrapper, 'saveAndCloseButton').simulate('click');

      expect(window.location.href.endsWith('/payRun')).toBe(true);
    });
  });
});
