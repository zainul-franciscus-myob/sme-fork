import { mount } from 'enzyme';

import { GET_BUSINESS_SID } from '../stpNotifyAtoIntents';
import { findButtonWithTestId } from '../../../../../../common/tests/selectors';
import ConfirmationModal from '../components/ConfirmationModal';
import StpNotifyAtoModule from '../StpNotifyAtoModule';

describe('StpNotifyAtoModule', () => {
  const defaultMockIntegration = {
    read: ({ onSuccess }) => onSuccess(),
    write: ({ onSuccess }) => onSuccess(),
  };

  const constructStpNotifyAtoModule = ({
    onPrevious = jest.fn(),
    onFinish = jest.fn(),
    integration = defaultMockIntegration,
  }) => {
    const context = {};
    const module = new StpNotifyAtoModule({
      onPrevious,
      onFinish,
      integration,
      context,
    });

    const wrapper = mount(module.getView());
    return { module, wrapper };
  };

  describe('Previous button', () => {
    it('calls the onPrevious function when clicked', () => {
      const onPrevious = jest.fn();
      const { wrapper } = constructStpNotifyAtoModule({ onPrevious });

      const previousButton = findButtonWithTestId(wrapper, 'previousButton');
      previousButton.simulate('click');

      expect(previousButton).toHaveLength(1);
      expect(onPrevious).toHaveBeenCalled();
    });
  });

  describe('Modal Send button, calls the onFinish function when clicked', () => {
    it('calls the onFinish function when clicked', () => {
      const onFinish = jest.fn();
      const { module, wrapper } = constructStpNotifyAtoModule({ onFinish });
      module.openConfirmationModal();
      wrapper.update();

      const finishButton = findButtonWithTestId(wrapper, 'sendButton');
      finishButton.simulate('click');

      expect(onFinish).toHaveBeenCalled();
    });
  });

  describe('Notified Ato button', () => {
    it('opens modal on click', () => {
      const { wrapper } = constructStpNotifyAtoModule({ });

      expect(wrapper.find(ConfirmationModal)).toHaveLength(0);

      const notifyAtoButton = findButtonWithTestId(wrapper, 'notifiedAtoButton');
      notifyAtoButton.simulate('click');

      wrapper.update();

      const modal = wrapper.find(ConfirmationModal);
      expect(modal).toHaveLength(1);
    });
  });

  describe('getBusinessSid', () => {
    it('makes a call to the integration', () => {
      const integration = {
        read: jest.fn(),
      };
      const { module } = constructStpNotifyAtoModule({ integration });

      module.getBusinessSid({
        onSuccess: () => { },
        onFailure: () => { },
      });

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: GET_BUSINESS_SID,
      }));
    });

    it('calls onSuccess if the request succeeds', () => {
      const integration = {
        read: ({ onSuccess }) => onSuccess({ sid: 123 }),
      };
      const { module } = constructStpNotifyAtoModule({ integration });
      const onSuccess = jest.fn();
      const onFailure = () => { };

      module.getBusinessSid({ onSuccess, onFailure });

      expect(onSuccess).toHaveBeenCalled();
    });

    it('calls onFailure if the request fails', () => {
      const integration = {
        read: ({ onFailure }) => onFailure({ message: 'some error message' }),
      };
      const { module } = constructStpNotifyAtoModule({ integration });
      const onFailure = jest.fn();
      const onSuccess = () => { };

      module.getBusinessSid({ onSuccess, onFailure });

      expect(onFailure).toHaveBeenCalled();
    });

    it('stores the business sid in the state', () => {
      const integration = {
        read: ({ onSuccess }) => onSuccess({ sid: 123 }),
      };
      const { module } = constructStpNotifyAtoModule({ integration });

      const onFailure = () => { };
      const onSuccess = () => { };

      module.getBusinessSid({ onSuccess, onFailure });

      const { sid } = module.store.getState();

      expect(sid).toEqual(123);
    });
  });
});
