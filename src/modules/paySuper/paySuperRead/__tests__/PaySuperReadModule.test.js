import { Alert } from '@myob/myob-widgets';
import { mount } from 'enzyme/build';

import { findButtonWithTestId } from '../../../../common/tests/selectors';
import PaySuperReadModule from '../PaySuperReadModule';
import ReversalModal from '../components/ReversalModal';
import StsLoginModal from '../../../stsLogin/components/StsLoginModal';
import loadPaySuperReadResponse from '../mappings/data/loadPaySuperReadResponse';

describe('PaySuperReadModule', () => {
  const defaultIntegration = {
    write: ({ onSuccess }) => onSuccess({}),
    read: ({ onSuccess }) => onSuccess(loadPaySuperReadResponse),
  };

  const constructModule = (integration = defaultIntegration) => {
    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const pushMessage = jest.fn();
    const module = new PaySuperReadModule({
      integration,
      setRootView,
      pushMessage,
    });
    module.run();

    return {
      wrapper,
      module,
    };
  };

  describe('onAuthoriseSuccess', () => {
    it('sets success alert', () => {
      const successMessage = 'Authorised successfully!';
      const { module, wrapper } = constructModule();

      module.onAuthoriseSuccess(successMessage);
      wrapper.update();

      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(1);
      expect(alert.contains(successMessage)).toBeTruthy();
      expect(alert.prop('type')).toEqual('success');
    });
  });

  describe('reversal modal', () => {
    const reversalIntegration = {
      ...defaultIntegration,
      read: ({ onSuccess }) =>
        onSuccess({
          ...loadPaySuperReadResponse,
          status: 'FundsUnavailable',
        }),
    };
    it('opens the modal when you press the reversal action button', () => {
      const { wrapper } = constructModule(reversalIntegration);
      wrapper.update();

      findButtonWithTestId(wrapper, 'reversalButton').simulate('click');
      wrapper.update();

      expect(wrapper.find(ReversalModal)).toHaveLength(1);
    });

    it('closes the modal when cancel button is clicked', () => {
      const { wrapper, module } = constructModule(reversalIntegration);
      module.openReverseModal();
      wrapper.update();

      findButtonWithTestId(wrapper, 'reversalCancelButton').simulate('click');

      expect(wrapper.find(ReversalModal)).toHaveLength(0);
    });
  });

  describe('Record reversal button', () => {
    const reversalIntegration = {
      ...defaultIntegration,
      read: ({ onSuccess }) =>
        onSuccess({
          ...loadPaySuperReadResponse,
          status: 'FundsUnavailable',
        }),
    };

    it('shows a sts login modal when record reversal clicked', () => {
      const { wrapper, module } = constructModule({
        ...reversalIntegration,
      });
      module.openReverseModal();
      wrapper.update();
      findButtonWithTestId(wrapper, 'reversalConfirmButton').simulate('click');
      wrapper.update();

      findButtonWithTestId(wrapper, 'recordReversalButton').simulate('click');

      expect(wrapper.find(ReversalModal)).toHaveLength(0);
      expect(wrapper.find(StsLoginModal).exists()).toBeTruthy();
    });

    it('calls return to list on successful reversal', () => {
      const { module } = constructModule({
        ...reversalIntegration,
      });
      module.returnToList = jest.fn();

      module.reversePaySuper();

      const state = module.store.getState();
      expect(module.returnToList).toHaveBeenCalled();
      expect(state.alert).toEqual(null);
    });

    it('set correct failure alert when transaction is not reversed successfully', () => {
      const { wrapper, module } = constructModule({
        ...reversalIntegration,
        write: ({ onFailure }) => {
          onFailure({ message: 'Reversal failure message' });
        },
      });

      module.reversePaySuper();
      wrapper.update();

      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(1);
      expect(alert.prop('type')).toEqual('danger');
      expect(alert.text()).toContain('Reversal failure message');
    });
  });
});
