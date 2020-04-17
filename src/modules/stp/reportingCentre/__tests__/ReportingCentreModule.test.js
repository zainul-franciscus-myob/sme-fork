import { Tabs } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { tabIds } from '../TabItems';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';
import ReportingCentreModule from '../ReportingCentreModule';
import ReportingCentreView from '../components/ReportingCentreView';

describe('ReportingCentreModule', () => {
  const setupModule = (registrationStatus, tab, payrollIsSetUp) => {
    const context = {
      region: 'au',
      businessId: '123',
      tab,
    };

    const integration = {
      read: ({ onSuccess }) => onSuccess({
        status: registrationStatus,
        payrollIsSetUp,
      }),
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
      const wrapper = setupModule('registered', tabIds.reports, true);

      const reportsCentreView = wrapper.find(ReportingCentreView);

      expect(reportsCentreView).toHaveLength(1);
    });

    it('should redirect the page when the registration status is not registered', () => {
      setupModule('notRegistered', tabIds.reports, true);

      expect(window.location.href).toContain('/#/au/123/stp/getStarted');
    });
  });

  it('shows the finalisation tab', () => {
    const wrapper = setupModule('registered', tabIds.reports, true);

    const tabs = wrapper.find(Tabs);
    expect(tabs.prop('items').find(item => item.id === tabIds.finalisation)).toBeTruthy();
  });

  it('shows payroll not set up view when currentYear is null', () => {
    const wrapper = setupModule('registered', tabIds.reports, false);

    const payrollNotSetUpView = wrapper.find(PayrollNotSetup);

    expect(payrollNotSetUpView).toHaveLength(1);
  });
});
