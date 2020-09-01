import { Tabs } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { tabIds } from '../TabItems';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';
import ReportingCentreModule from '../ReportingCentreModule';
import ReportingCentreView from '../components/ReportingCentreView';

describe('ReportingCentreModule', () => {
  const setupModule = (
    registrationStatus,
    tab,
    payrollIsSetUp,
    featureToggles = {}
  ) => {
    const context = {
      region: 'au',
      businessId: '123',
      tab,
    };

    const integration = {
      read: ({ onSuccess }) =>
        onSuccess({
          status: registrationStatus,
          payrollIsSetUp,
        }),
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const pushMessage = () => {};
    const popMessages = () => [];

    const module = new ReportingCentreModule({
      integration,
      setRootView,
      replaceURLParams: (url) => url,
      featureToggles,
      pushMessage,
      popMessages,
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
    expect(
      tabs.prop('items').find((item) => item.id === tabIds.finalisation)
    ).toBeTruthy();
  });

  it('shows payroll not set up view when currentYear is null', () => {
    const wrapper = setupModule('registered', tabIds.reports, false);

    const payrollNotSetUpView = wrapper.find(PayrollNotSetup);

    expect(payrollNotSetUpView).toHaveLength(1);
  });

  describe('Job keeper tab', () => {
    it('shows if the feature toggle is on', () => {
      const wrapper = setupModule('registered', tabIds.reports, true, {
        isJobKeeperTabEnabled: true,
      });

      const tabs = wrapper.find(Tabs);
      expect(
        tabs.prop('items').find((item) => item.id === tabIds.jobKeeper)
      ).toBeTruthy();
    });

    it('does not show if the feature toggle is on', () => {
      const wrapper = setupModule('registered', tabIds.reports, true);

      const tabs = wrapper.find(Tabs);
      expect(
        tabs.prop('items').find((item) => item.id === tabIds.jobKeeper)
      ).toBeFalsy();
    });
  });

  describe('Job keeper GST calculator tab', () => {
    it('shows tab if the feature toggle is on', () => {
      const wrapper = setupModule('registered', tabIds.reports, true, {
        isJobKeeperCalculatorEnabled: true,
      });

      const tabs = wrapper.find(Tabs);
      expect(
        tabs.prop('items').find((item) => item.id === tabIds.gstCalculator)
      ).toBeTruthy();
    });

    it('does not tab show if the feature toggle is false', () => {
      const wrapper = setupModule('registered', tabIds.reports, true, {
        isJobKeeperCalculatorEnabled: false,
      });

      const tabs = wrapper.find(Tabs);
      expect(
        tabs.prop('items').find((item) => item.id === tabIds.gstCalculator)
      ).toBeFalsy();
    });
  });
});
