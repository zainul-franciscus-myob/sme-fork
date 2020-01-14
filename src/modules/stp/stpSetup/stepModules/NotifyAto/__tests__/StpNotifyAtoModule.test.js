import { mount } from 'enzyme';

import { GET_SOFTWARE_ID } from '../stpNotifyAtoIntents';
import { findButtonWithTestId } from '../../../../../../common/tests/selectors';
import ConfirmationModal from '../components/ConfirmationModal';
import StpNotifyAtoModule from '../StpNotifyAtoModule';

describe('StpNotifyAtoModule', () => {
  const defaultIntegrationStub = {
    read: ({ onSuccess }) => onSuccess(),
    write: ({ onSuccess }) => onSuccess(),
  };

  const constructStpNotifyAtoModule = ({
    onPrevious = jest.fn(),
    onFinish = jest.fn(),
    integration = defaultIntegrationStub,
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

  describe('getSoftwareId', () => {
    it('makes a call to the integration', () => {
      const integration = {
        read: jest.fn(),
      };
      const { module } = constructStpNotifyAtoModule({ integration });

      module.getSoftwareId({});

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: GET_SOFTWARE_ID,
      }));
    });

    it('stores the business sid in the state', () => {
      const integration = {
        read: ({ onSuccess }) => onSuccess({ sid: 123 }),
      };
      const { module } = constructStpNotifyAtoModule({ integration });

      module.getSoftwareId({});

      const { sid } = module.store.getState();

      expect(sid).toEqual(123);
    });
  });
});
