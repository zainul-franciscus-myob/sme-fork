import { Tabs } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import * as EOFYFinalisationToggles from '../../../../common/featureToggles/EOFYFinalisationEnabled';
import { tabIds } from '../TabItems';
import ReportingCentreModule from '../ReportingCentreModule';
import ReportingCentreView from '../components/ReportingCentreView';

describe('ReportingCentreModule', () => {
  const setupModule = (registrationStatus, tab) => {
    const context = {
      region: 'au',
      businessId: '123',
      tab,
    };

    const integration = {
      read: ({ onSuccess }) => onSuccess({ status: registrationStatus }),
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new ReportingCentreModule({
      integration,
      setRootView,
      replaceURLParams: url => (url),
    });

    module.run(context);
    wrapper.update();
    return wrapper;
  };

  describe('loadRegistrationStatus', () => {
    it('should render the page when the registration status is registered', () => {
      const wrapper = setupModule('registered', tabIds.reports);

      const reportsCentreView = wrapper.find(ReportingCentreView);

      expect(reportsCentreView).toHaveLength(1);
    });

    it('should redirect the page when the registration status is not registered', () => {
      setupModule('notRegistered', tabIds.reports);

      expect(window.location.href).toContain('/#/au/123/stp/getStarted');
    });
  });

  describe('REACT_APP_FEATURE_EOFY_FINALISATION', () => {
    it('hides the finalisation tab when feature toggle is off', () => {
      EOFYFinalisationToggles.default = false;
      const wrapper = setupModule('registered', tabIds.reports);

      const tabs = wrapper.find(Tabs);

      expect(tabs.prop('items').find(item => item.id === tabIds.finalisation)).not.toBeTruthy();
    });

    it('shows the finalisation tab when feature toggle is on', () => {
      EOFYFinalisationToggles.default = true;
      const wrapper = setupModule('registered', tabIds.reports);

      const tabs = wrapper.find(Tabs);
      expect(tabs.prop('items').find(item => item.id === tabIds.finalisation)).toBeTruthy();
    });
  });
});
