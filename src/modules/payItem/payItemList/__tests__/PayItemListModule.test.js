import { mount } from 'enzyme';

import { LOAD_PAYROLL_SETTINGS } from '../../PayItemIntents';
import PayItemListModule from '../PayItemListModule';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';
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
