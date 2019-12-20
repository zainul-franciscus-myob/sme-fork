import { Alert } from '@myob/myob-widgets';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import { GET_CODE_TO_AUTHORISE } from '../paySuperAuthorisationModalIntents';
import AuthorisationModal from '../components/AuthorisationModal';
import LoginModal from '../components/LoginModal';
import PaySuperAuthorisationModalModule from '../PaySuperAuthorisationModalModule';

Enzyme.configure({ adapter: new Adapter() });


describe('PaySuperAuthorisationModalModule', () => {
  const integration = {
    write: ({ onSuccess }) => onSuccess({}),
  };
  const batchPaymentId = 1;

  it('constructor does not raise an exception', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new PaySuperAuthorisationModalModule({ integration });
    }).not.toThrow();
  });

  describe('alert', () => {
    it('keeps modal open and renders alert when login request fails', () => {
      const failureMessage = 'something went wrong';
      const failingIntegration = {
        write: ({ onFailure }) => onFailure({ message: failureMessage }),
      };
      const module = new PaySuperAuthorisationModalModule({ integration: failingIntegration });

      module.openModal(batchPaymentId);
      module.handleLoginClick();
      const wrapper = mount(module.getView());

      expect(wrapper.find(LoginModal)).toHaveLength(1);
      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(1);
      expect(alert.contains(failureMessage)).toBeTruthy();
      expect(alert.prop('type')).toEqual('danger');
    });

    it('keeps modal open and renders alert when login request fails', () => {
      const failureMessage = 'something went wrong';
      const failingIntegration = {
        write: ({ onSuccess, onFailure, intent }) => {
          if (intent === GET_CODE_TO_AUTHORISE) {
            onSuccess({});
          } else {
            onFailure({ message: failureMessage });
          }
        },
      };
      const module = new PaySuperAuthorisationModalModule({ integration: failingIntegration });
      module.openModal(batchPaymentId);
      module.handleLoginClick(); // succeeds
      const wrapper = mount(module.getView());

      module.authoriseSuperPayment(); // fails
      wrapper.update();

      expect(wrapper.find(AuthorisationModal)).toHaveLength(1);
      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(1);
      expect(alert.contains(failureMessage)).toBeTruthy();
      expect(alert.prop('type')).toEqual('danger');
    });
  });

  describe('getView', () => {
    it('returns no modal if openModal has not been called', () => {
      const module = new PaySuperAuthorisationModalModule({ integration });

      const wrapper = mount(module.getView());

      expect(wrapper.find(LoginModal)).toHaveLength(0);
    });

    it('returns the modal if openModal has been called', () => {
      const module = new PaySuperAuthorisationModalModule({ integration });

      module.openModal(batchPaymentId);
      const wrapper = mount(module.getView());

      expect(wrapper.find(LoginModal)).toHaveLength(1);
    });

    it('it returns no modal after closeModal has been called', () => {
      const module = new PaySuperAuthorisationModalModule({ integration });

      module.openModal(batchPaymentId);
      const wrapper = mount(module.getView());
      expect(wrapper.find(LoginModal)).toHaveLength(1);

      module.closeModal();
      wrapper.update();

      expect(wrapper.find(LoginModal)).toHaveLength(0);
    });

    it('renders the authorisation modal if they log in successfully', () => {
      const module = new PaySuperAuthorisationModalModule({ integration });

      module.openModal(batchPaymentId);
      module.handleLoginClick();
      const wrapper = mount(module.getView());

      expect(wrapper.find(AuthorisationModal)).toHaveLength(1);
    });
  });
});
