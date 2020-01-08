import { Alert } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_BUSINESS_CONTACT_INFORMATION, SUBMIT_BUSINESS_CONTACT_INFORMATION } from '../StpDeclarationInformationIntents';
import StpDeclarationInformationModule from '../StpDeclarationInformationModule';
import loadBusinessContactInformation from '../mappings/data/loadBusinessContactInformation';


const findComponentWithTestId = (wrapper, testId, componentName) => wrapper.findWhere(c => (
  c.prop('testid') === testId && c.name() === componentName
));

const findButtonWithTestId = (wrapper, testId) => findComponentWithTestId(wrapper, testId, 'Button');

const simulateInputChange = (component, value) => component.prop('onChange')({ target: { value, name: component.prop('name') } });

describe('StpDeclarationInformationModule', () => {
  const constructModule = ({
    integration = {
      read: ({ onSuccess }) => onSuccess(loadBusinessContactInformation),
      write: ({ onSuccess }) => onSuccess(),
    },
    onPrevious = jest.fn(),
    onFinish = jest.fn(),
  }) => {
    const module = new StpDeclarationInformationModule({ integration, onPrevious, onFinish });
    const wrapper = mount(module.getView());

    return {
      module,
      wrapper,
    };
  };

  describe('previousButton', () => {
    it('calls the passed onPrevious function', () => {
      const onPrevious = jest.fn();
      const { wrapper } = constructModule({
        onPrevious,
      });

      const previousButton = findButtonWithTestId(wrapper, 'previousButton');
      previousButton.simulate('click');

      expect(onPrevious).toHaveBeenCalled();
    });
  });

  describe('nextButton', () => {
    it('it submits form data to integration', () => {
      const integration = {
        write: jest.fn(),
      };
      const { wrapper } = constructModule({
        integration,
      });

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');
      nextButton.simulate('click');

      expect(integration.write).toHaveBeenCalledWith(expect.objectContaining({
        intent: SUBMIT_BUSINESS_CONTACT_INFORMATION,
      }));
    });

    it('calls the passed onFinish function if the request succeeds', () => {
      const onFinish = jest.fn();
      const { wrapper } = constructModule({
        onFinish,
      });

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');
      nextButton.simulate('click');

      expect(onFinish).toHaveBeenCalled();
    });

    it('does not call the passed onFinish function if the request fails', () => {
      const integration = {
        write: ({ onFailure }) => onFailure({ message: 'failed to submit information' }),
      };
      const onFinish = jest.fn();
      const { wrapper } = constructModule({
        onFinish,
        integration,
      });

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');
      nextButton.simulate('click');

      expect(onFinish).not.toHaveBeenCalled();
    });
  });

  describe('loadBusinessInformation', () => {
    it('should make a request to the integration', () => {
      const integration = { read: jest.fn() };
      const { module } = constructModule({ integration });

      module.loadBusinessInformation({});

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_BUSINESS_CONTACT_INFORMATION,
      }));
    });

    it('should render an alert if business contact information was found', () => {
      const { wrapper, module } = constructModule({});

      module.loadBusinessInformation({});
      wrapper.update();

      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(1);
      expect(alert.prop('type')).toEqual('info');
    });

    it('should not render an alert if business contact information was not found', () => {
      const integration = {
        read: ({ onSuccess }) => onSuccess({
          businessContactInformationWasFound: false,
        }),
      };
      const { wrapper, module } = constructModule({ integration });

      module.loadBusinessInformation({});
      wrapper.update();

      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(0);
    });

    describe('alerting', () => {
      it('should render an error alert if the integration fails', () => {
        const errorMessage = 'THIS IS A TEST ERROR MESSAGE';
        const integration = {
          read: ({ onFailure }) => onFailure({
            message: errorMessage,
          }),
        };
        const { wrapper, module } = constructModule({ integration });

        module.loadBusinessInformation({});
        wrapper.update();

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.prop('type')).toEqual('danger');
        expect(alert.contains(errorMessage)).toBeTruthy();
      });

      it('should not render an error alert if the integration succeeds', () => {
        const { wrapper, module } = constructModule({});

        module.loadBusinessInformation({});
        wrapper.update();

        const errorAlert = wrapper.findWhere(c => c.name() === 'Alert' && c.prop('type') === 'danger');
        expect(errorAlert).toHaveLength(0);
      });
    });
  });

  describe('Form', () => {
    it('gets fields values from the state', () => {
      const { wrapper, module } = constructModule({});

      module.loadBusinessInformation({});
      wrapper.update();

      const payerAbnInput = findComponentWithTestId(wrapper, 'payerAbnInput', 'Input');
      expect(payerAbnInput).toHaveLength(1);
      expect(payerAbnInput.prop('value')).toEqual(loadBusinessContactInformation.payerAbn);
    });

    it('updates the state on change of a field', () => {
      const { wrapper, module } = constructModule({});

      const payerAbnInput = findComponentWithTestId(wrapper, 'payerAbnInput', 'Input');

      simulateInputChange(payerAbnInput, '123');

      expect(module.store.getState().payerAbn).toEqual('123');
    });
  });
});
