import { mount } from 'enzyme';

import { findButtonWithTestId } from '../../../../common/tests/selectors';
import RegistrationErrorsModal from '../components/RegistrationErrorsModal';
import StpGetStartedModule from '../StpGetStartedModule';
import loadRegistrationItemsValidation from '../mappings/data/loadRegistrationItemsValidation';

describe('StpGetStartedModule', () => {
  const defaultIntegration = {
    write: ({ onSuccess }) => onSuccess({}),
    read: ({ onSuccess }) => onSuccess(loadRegistrationItemsValidation),
  };

  const constructModule = (integration = defaultIntegration) => {
    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const module = new StpGetStartedModule({ integration, setRootView });
    module.run();

    return {
      wrapper,
      module,
    };
  };

  it('constructor does not raise an exception', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new StpGetStartedModule({ integration: defaultIntegration });
    }).not.toThrow();
  });

  it('renders the get started button', () => {
    const { wrapper } = constructModule();

    expect(findButtonWithTestId(wrapper, 'getStartedButton')).toHaveLength(1);
  });

  it('does not render the modal on page load', () => {
    const { wrapper } = constructModule();

    const modal = wrapper.find(RegistrationErrorsModal);

    expect(modal).toHaveLength(0);
  });

  it('does not render the modal where there are no stp registration errors', () => {
    const noErrorIntegration = {
      read: ({ onSuccess }) =>
        onSuccess({
          hasRegistrationErrors: false,
        }),
    };
    const { wrapper } = constructModule(noErrorIntegration);

    findButtonWithTestId(wrapper, 'getStartedButton').simulate('click');
    wrapper.update();

    const modal = wrapper.find(RegistrationErrorsModal);
    expect(modal).toHaveLength(0);
  });

  it('it renders the modal when there are stp registration errors', () => {
    const { wrapper } = constructModule();

    findButtonWithTestId(wrapper, 'getStartedButton').simulate('click');
    wrapper.update();

    const modal = wrapper.find(RegistrationErrorsModal);
    expect(modal).toHaveLength(1);
  });

  it('it closes the modal when cancel button is clicked', () => {
    const { wrapper } = constructModule();
    findButtonWithTestId(wrapper, 'getStartedButton').simulate('click');
    wrapper.update();

    findButtonWithTestId(wrapper, 'cancelButton').simulate('click');
    wrapper.update();

    const modal = wrapper.find(RegistrationErrorsModal);
    expect(modal).toHaveLength(0);
  });
});
