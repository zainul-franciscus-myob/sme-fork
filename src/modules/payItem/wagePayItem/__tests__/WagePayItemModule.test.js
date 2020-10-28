import { mount } from 'enzyme';

import WagePayItemModule from '../WagePayItemModule';
import loadNewWage from '../mappings/data/loadNewWage';

describe('WagePayItemModule', () => {
  const defaultIntegration = {
    read: ({ onSuccess }) => onSuccess(loadNewWage),
    write: jest.fn(),
  };

  const constructWagePayItemModule = ({ integration, featureToggles }) => {
    const moduleIntegration = {
      ...defaultIntegration,
      ...integration,
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const module = new WagePayItemModule({
      integration: moduleIntegration,
      setRootView,
      featureToggles,
    });
    module.run();
    wrapper.update();
    return {
      wrapper,
      module,
    };
  };

  describe('jobKeeper', () => {
    it('does not show the checkbox if the feature toggle is off', () => {
      const { wrapper } = constructWagePayItemModule({
        integration: {},
        featureToggles: {
          isJobKeeperTabEnabled: false,
        },
      });

      const jobKeeperCheckbox = wrapper.find({ testid: 'jobKeeperCheckbox' });

      expect(jobKeeperCheckbox).toHaveLength(0);
    });

    it('shows the checkbox if the feature toggle is on', () => {
      const { wrapper } = constructWagePayItemModule({
        integration: {},
        featureToggles: {
          isJobKeeperTabEnabled: true,
        },
      });

      const jobKeeperCheckbox = wrapper.findWhere(
        (c) =>
          c.name() === 'Checkbox' && c.prop('testid') === 'jobKeeperCheckbox'
      );

      expect(jobKeeperCheckbox).toHaveLength(1);
    });
  });
});
