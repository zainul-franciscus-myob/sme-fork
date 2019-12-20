import { Alert } from '@myob/myob-widgets';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import PaySuperReadModule from '../PaySuperReadModule';
import loadPaySuperReadResponse from '../../../integration/data/paySuperRead/loadPaySuperReadResponse';

Enzyme.configure({ adapter: new Adapter() });

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
    const module = new PaySuperReadModule({ integration, setRootView });
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
});
