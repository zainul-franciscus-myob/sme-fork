import { mount } from 'enzyme';

import { LOAD_TIMESHEETS, START_NEW_PAY_RUN } from '../PayRunIntents';
import PayRunModule from '../PayRunModule';
import loadTimesheetsResponse from '../../mappings/data/payRun/loadTimesheets';
import startNewPayRunResponse from '../../mappings/data/payRun/startNewPayRun';

describe('PayRunModule', () => {
  const constructPayRunModule = (successResponse) => {
    const integration = {
      read: ({ intent, onSuccess }) => {
        if (intent === START_NEW_PAY_RUN) {
          onSuccess(
            successResponse || startNewPayRunResponse,
          );
        } else if (intent === LOAD_TIMESHEETS) {
          onSuccess(
            loadTimesheetsResponse,
          );
        }
      },
      write: () => {},
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const payRunModule = new PayRunModule({ integration, setRootView, pushMessage: [] });
    payRunModule.run();
    payRunModule.startNewPayRun();

    wrapper.update();
    return wrapper;
  };

  it('renders the payroll setup required screen if payroll setup is incomplete', () => {
    const wrapper = constructPayRunModule({
      isPayrollSetup: false,
    });
    const header = wrapper.find({ testid: 'payrollNotSetup' });

    expect(header).toHaveLength(1);
  });

  it('renders the title of the start pay run', () => {
    const wrapper = constructPayRunModule();
    const header = wrapper.find({ testid: 'startPayRunViewPageHead' });

    expect(header).toHaveLength(1);
  });

  it('renders the pay cycle', () => {
    const wrapper = constructPayRunModule();
    const payCycleDropDown = wrapper.find({ testid: 'payCycleDropDown' });

    expect(payCycleDropDown).toHaveLength(1);
  });

  describe('ExistingPayRunModal', () => {
    it('When there is no draft data, the exitingPayRun modal should not be rendered', () => {
      const successResponse = {
        ...startNewPayRunResponse,
        draftPayRun: null,
      };
      const wrapper = constructPayRunModule(successResponse);

      const modal = wrapper.find({ testid: 'existingPayRunModal' });

      expect(modal).toHaveLength(0);
    });

    it('When there is draft data, the existingPayRun modal should be rendered', () => {
      const wrapper = constructPayRunModule();

      const modal = wrapper.find({ testid: 'existingPayRunModal' });

      expect(modal).toHaveLength(1);
    });
  });

  describe('load timesheets', () => {
    it('loads timesheets when the user has turned on timesheets', () => {
      const successResponse = {
        ...startNewPayRunResponse,
        isTimesheetUsed: true,
      };
      const wrapper = constructPayRunModule(successResponse);

      const timesheetsTable = wrapper.find({ testid: 'timesheetsTable' });

      expect(timesheetsTable).toHaveLength(1);
    });

    it('does not load timesheets when the user has not turned on timesheets', () => {
      const successResponse = {
        ...startNewPayRunResponse,
        isTimesheetUsed: false,
      };
      const wrapper = constructPayRunModule(successResponse);

      const timesheetsTable = wrapper.find({ testid: 'timesheetsTable' });

      expect(timesheetsTable).toHaveLength(0);
    });
  });
});
