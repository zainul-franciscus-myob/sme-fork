import { mount } from 'enzyme';

import { LOAD_PAYROLL_SETTINGS } from '../../PayItemIntents';
import { tabIds } from '../tabItems';
import PayItemListModule from '../PayItemListModule';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createPayItemListIntegrator from '../createPayItemListDispatcher';
import payItemListReducer from '../payItemListReducer';
import wageList from '../mappings/data/loadWageList';

describe('PayItemListModule', () => {
  const defaultPayrollSettings = { currentYear: null };

  const constructPayItemListModule = ({
    payrollSettings = defaultPayrollSettings,
  }) => {
    const integration = {
      read: ({ intent, onSuccess }) => {
        if (intent === LOAD_PAYROLL_SETTINGS) {
          onSuccess(payrollSettings);
        } else {
          onSuccess(wageList);
        }
      },
      write: () => {},
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const payItemListModule = new PayItemListModule({
      integration,
      setRootView,
      pushMessage: [],
      popMessages: () => [],
      replaceURLParams: () => {},
    });
    payItemListModule.run();

    wrapper.update();
    return wrapper;
  };

  it('shows payroll not set up view when the payroll year is not set up', () => {
    const wrapper = constructPayItemListModule({});

    const payrollNotSetUpView = wrapper.find(PayrollNotSetup);

    expect(payrollNotSetUpView).toHaveLength(1);
  });

  it('does not show payroll not set up view when the payroll year is set up', () => {
    const wrapper = constructPayItemListModule({
      payrollSettings: { currentYear: '2020' },
    });

    const payrollNotSetUpView = wrapper.find(PayrollNotSetup);

    expect(payrollNotSetUpView).toHaveLength(0);
  });
});

describe('setTabAndLoadContent', () => {
  const setup = () => {
    const store = new TestStore(payItemListReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const popMessages = () => [];

    const module = new PayItemListModule({
      store,
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;
    module.integrator = createPayItemListIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({
      businessId: 'ahhhhh',
      region: 'au',
    });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  it('replace url parameter to selected tab', () => {
    const { module } = setupWithRun();
    module.replaceURLParams = jest.fn();

    module.setTabAndLoadContent(tabIds.deductions);

    expect(module.replaceURLParams).toHaveBeenCalledWith({
      tab: tabIds.deductions,
    });
  });
});
