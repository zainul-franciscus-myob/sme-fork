import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import EmployeePayListModule from '../EmployeePayListModule';
import PayRunModule from '../../PayRunModule';
import UnsavedModal from '../../../../../components/modal/UnsavedModal';

describe('EmployeePayListModule', () => {
  const constructEmployeePayListModule = () => {
    const integration = { write: ({ onSuccess }) => { onSuccess({ message: 'success' }); } };
    const pushMessage = () => {};
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
    return { wrapper, module: employeePayListModule };
  };

  describe('Save and close button', () => {
    it('renders the Save and close button', () => {
      const { wrapper } = constructEmployeePayListModule();

      const saveAndCloseButton = findButtonWithTestId(wrapper, 'saveAndCloseButton');

      expect(saveAndCloseButton).toHaveLength(1);
    });

    it('redirects to payRun url, when clicked', () => {
      const { wrapper } = constructEmployeePayListModule();

      findButtonWithTestId(wrapper, 'saveAndCloseButton').simulate('click');

      expect(window.location.href.endsWith('/payRun')).toBe(true);
    });
  });

  describe('tryToNavigate', () => {
    const navigateFunction = () => {
      window.location.href = 'some_url';
    };

    it('does not open unsaved changes modal when there are no changes', () => {
      const { wrapper, module } = constructEmployeePayListModule();

      module.tryToNavigate(navigateFunction);
      wrapper.update();
      const unsavedModal = wrapper.find(UnsavedModal);

      expect(unsavedModal).toHaveLength(0);
    });

    it('opens unsaved changes modal when there are changes', () => {
      const { wrapper, module } = constructEmployeePayListModule();

      const bulkSelectCheckbox = wrapper.find('input[type="checkbox"]');
      bulkSelectCheckbox.simulate('change', { target: { checked: true } });

      module.tryToNavigate(navigateFunction);
      wrapper.update();

      const unsavedModal = wrapper.find(UnsavedModal);

      expect(unsavedModal).toHaveLength(1);
    });
  });
});
