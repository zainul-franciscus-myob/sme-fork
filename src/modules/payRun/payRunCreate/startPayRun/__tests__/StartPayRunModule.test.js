import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_PAYS, VALIDATE_STP_REGISTRATION } from '../../PayRunIntents';
import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import PayRunModule from '../../PayRunModule';
import StartPayRunModule from '../StartPayRunModule';

describe('StartPayRunModule', () => {
  const constructModule = (integration, featureToggles) => {
    const pushMessage = () => { };
    const setRootView = () => (<div />);
    const payRunModule = new PayRunModule({ integration, setRootView, pushMessage });

    const startPayRunModule = new StartPayRunModule({
      integration, store: payRunModule.store, pushMessage, featureToggles,
    });
    const view = startPayRunModule.getView();

    const wrappedView = (
      <Provider store={payRunModule.store}>
        {view}
      </Provider>
    );

    const wrapper = mount(wrappedView);

    wrapper.update();
    return { wrapper, module: startPayRunModule };
  };

  describe('stpValidationErrorModal', () => {
    const featureToggles = { isPayRunStpValidationEnabled: true };

    it('does not show the modal, if there are no validation errors', () => {
      const integration = {
        read: ({ onSuccess }) => {
          onSuccess({ hasRegistrationErrors: false });
        },
        write: () => {},
      };

      const { wrapper } = constructModule(integration, featureToggles);

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');

      nextButton.simulate('click');
      wrapper.update();

      const validationModal = wrapper.find({ testid: 'stpValidationErrorModal' });

      expect(validationModal).toHaveLength(0);
    });

    it('calls load employees, if there are no validation errors', () => {
      const integrationWrite = jest.fn();

      const integration = {
        read: ({ onSuccess }) => {
          onSuccess({ hasRegistrationErrors: false });
        },
        write: integrationWrite,
      };

      const { wrapper } = constructModule(integration, featureToggles);

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');

      nextButton.simulate('click');
      wrapper.update();

      expect(integrationWrite).toHaveBeenCalledWith(
        expect.objectContaining({ intent: LOAD_EMPLOYEE_PAYS }),
      );
    });

    it('shows the modal, if there are validation errors', () => {
      const integration = {
        read: ({ onSuccess }) => {
          onSuccess({ hasRegistrationErrors: true });
        },
      };

      const { wrapper } = constructModule(integration, featureToggles);

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');

      nextButton.simulate('click');
      wrapper.update();

      const validationModal = wrapper.find({ testid: 'stpValidationErrorModal' });

      expect(validationModal).toHaveLength(1);
    });
  });

  describe('stpValidationFeatureToggle', () => {
    describe('clicking the next button', () => {
      it('calls load employee, when toggle is off', () => {
        const integrationWrite = jest.fn();
        const integration = { write: integrationWrite };
        const { wrapper } = constructModule(integration);

        const nextButton = findButtonWithTestId(wrapper, 'nextButton');

        nextButton.simulate('click');

        expect(integrationWrite).toHaveBeenCalledWith(
          expect.objectContaining({ intent: LOAD_EMPLOYEE_PAYS }),
        );
      });
    });

    it('calls stp validation, when toggle is on', () => {
      const integrationRead = jest.fn();
      const integration = { read: integrationRead };
      const { wrapper } = constructModule(integration, { isPayRunStpValidationEnabled: true });

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');

      nextButton.simulate('click');
      wrapper.update();

      expect(integrationRead).toHaveBeenCalledWith(
        expect.objectContaining({ intent: VALIDATE_STP_REGISTRATION }),
      );
    });
  });
});
