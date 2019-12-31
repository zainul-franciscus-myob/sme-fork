import { Alert } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_AGENT_CONTACT_INFO, SUBMIT_AGENT_CONTACT_INFO } from '../stpYourRoleIntents';
import ContactDetails from '../components/ContactDetails';
import Role from '../Role';
import StpYourRoleModule from '../StpYourRoleModule';
import loadAgentContact from '../mappings/data/loadAgentContact';

const mockIntegration = () => ({
  read: ({ onSuccess }) => onSuccess({}),
  write: ({ onSuccess }) => onSuccess({}),
});

const setRole = (module, wrapper, role) => {
  module.onFieldChange({ key: 'role', value: role });
  wrapper.update();
};

const findButtonWithTestId = (wrapper, testId) => wrapper.findWhere(c => (
  c.prop('testId') === testId && c.name() === 'Button'
));

describe('StpYourRoleModule', () => {
  const constructModule = ({
    integration = mockIntegration(),
    onPrevious = () => {},
    onFinish = () => {},
  }) => {
    const module = new StpYourRoleModule({ integration, onPrevious, onFinish });
    const wrapper = mount(module.getView());

    return {
      module,
      wrapper,
    };
  };

  describe('agent ABN and RAN form', () => {
    it('does not display the agent form when business user is selected', () => {
      const { wrapper } = constructModule({});
      const agentForm = wrapper.find({ testId: 'agentForm' });

      expect(agentForm).toHaveLength(0);
    });

    it('displays agent form when agent role is selected', () => {
      const { wrapper, module } = constructModule({});

      setRole(module, wrapper, Role.TAX_AGENT);

      const agentForm = wrapper.find({ testId: 'agentForm' });
      expect(agentForm).toHaveLength(1);
    });

    it('sends a request to the integration when the search button is clicked', () => {
      const integration = { read: jest.fn() };
      const { wrapper, module } = constructModule({ integration });
      setRole(module, wrapper, Role.TAX_AGENT);
      const searchButton = findButtonWithTestId(wrapper, 'agentSearchButton');

      searchButton.simulate('click');

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_AGENT_CONTACT_INFO,
      }));
    });
  });

  describe('Contact details form', () => {
    it('does not show the contact details section before the search button is clicked', () => {
      const { wrapper, module } = constructModule({});
      setRole(module, wrapper, Role.TAX_AGENT);

      const contactDetails = wrapper.find(ContactDetails);
      expect(contactDetails).toHaveLength(0);
    });

    it('shows the contact details section when the search button is clicked', () => {
      const integration = { read: ({ onSuccess }) => onSuccess(loadAgentContact) };
      const { wrapper, module } = constructModule({ integration });
      setRole(module, wrapper, Role.TAX_AGENT);
      const searchButton = findButtonWithTestId(wrapper, 'agentSearchButton');

      searchButton.simulate('click');
      wrapper.update();

      const contactDetails = wrapper.find(ContactDetails);
      expect(contactDetails).toHaveLength(1);
    });

    it('renders an alert if contact details were be found', () => {
      const integration = {
        read: ({ onSuccess }) => onSuccess({
          contactFound: true,
        }),
      };
      const { wrapper, module } = constructModule({ integration });
      setRole(module, wrapper, Role.TAX_AGENT);
      const searchButton = findButtonWithTestId(wrapper, 'agentSearchButton');

      searchButton.simulate('click');
      wrapper.update();

      const contactDetailsAlert = wrapper.find(Alert);
      expect(contactDetailsAlert).toHaveLength(1);
      expect(contactDetailsAlert.prop('type')).toEqual('info');
    });

    it('does not render the alert if no contact could be found', () => {
      const integration = {
        read: ({ onSuccess }) => onSuccess({
          contactFound: false,
        }),
      };
      const { wrapper, module } = constructModule({ integration });
      setRole(module, wrapper, Role.TAX_AGENT);
      const searchButton = findButtonWithTestId(wrapper, 'agentSearchButton');

      searchButton.simulate('click');
      wrapper.update();

      const contactDetailsAlert = wrapper.find(Alert);
      expect(contactDetailsAlert).toHaveLength(0);
    });
  });

  describe('next button', () => {
    describe('someone from the business case', () => {
      it('does not make an integration call', () => {
        const integration = {
          write: jest.fn(),
        };
        const { wrapper } = constructModule({ integration });

        findButtonWithTestId(wrapper, 'nextButton').simulate('click');

        expect(integration.write).not.toHaveBeenCalled();
      });

      it('calls the onFinish function', () => {
        const onFinish = jest.fn();
        const { wrapper } = constructModule({ onFinish });

        findButtonWithTestId(wrapper, 'nextButton').simulate('click');

        expect(onFinish).toHaveBeenCalled();
      });
    });

    describe('agent case', () => {
      it('calls the submitAgentContact integration', () => {
        const integration = {
          write: jest.fn(),
        };
        const { module, wrapper } = constructModule({ integration });
        setRole(module, wrapper, Role.TAX_AGENT);

        findButtonWithTestId(wrapper, 'nextButton').simulate('click');
        expect(integration.write).toHaveBeenCalledWith(expect.objectContaining({
          intent: SUBMIT_AGENT_CONTACT_INFO,
        }));
      });

      it('calls the onFinish function if the request is successful', () => {
        const onFinish = jest.fn();
        const { module, wrapper } = constructModule({ onFinish });
        setRole(module, wrapper, Role.TAX_AGENT);

        findButtonWithTestId(wrapper, 'nextButton').simulate('click');

        expect(onFinish).toHaveBeenCalled();
      });

      it('renders a danger alert if the request is unsuccessful', () => {
        const message = 'This is an error message';
        const integration = {
          write: ({ onFailure }) => onFailure({ message }),
        };
        const onFinish = jest.fn();
        const { module, wrapper } = constructModule({ integration, onFinish });
        setRole(module, wrapper, Role.TAX_AGENT);

        findButtonWithTestId(wrapper, 'nextButton').simulate('click');
        wrapper.update();

        const alert = wrapper.findWhere(
          c => c.name() === 'Alert' && c.prop('type') === 'danger',
        );
        expect(alert).toHaveLength(1);
        expect(alert.contains(message)).toBeTruthy();

        expect(onFinish).not.toHaveBeenCalled();
      });
    });
  });

  describe('previous button', () => {
    it('calls the onPrevious function', () => {
      const onPrevious = jest.fn();
      const { wrapper } = constructModule({ onPrevious });

      findButtonWithTestId(wrapper, 'previousButton').simulate('click');

      expect(onPrevious).toHaveBeenCalled();
    });
  });
});
