import { mount } from 'enzyme';

import { LOAD_INITIAL_TIMESHEET } from '../timesheetIntents';
import { findButtonWithTestId, findComponentWithTestId } from '../../../common/tests/selectors';
import TimesheetModule from '../TimesheetModule';
import loadTimesheetInitial from '../mappings/data/loadTimesheetInitial';

describe('TimesheetModule', () => {
  const constructTimesheetModule = ({
    integration = { read: ({ onSuccess }) => (onSuccess(loadTimesheetInitial)), write: jest.fn() },
  }) => {
    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const module = new TimesheetModule({ integration, setRootView });
    module.run();
    wrapper.update();
    return {
      wrapper,
      module,
    };
  };

  describe('timesheetEnabledCheck', () => {
    it('makes the initial call to the integration', () => {
      const integration = {
        read: jest.fn(({ onSuccess }) => onSuccess(loadTimesheetInitial)),
      };

      constructTimesheetModule({ integration });

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_INITIAL_TIMESHEET,
      }));
    });

    describe('timesheets not set up', () => {
      it('renders the settings link if timesheet is not set up', () => {
        const integration = {
          read: ({ onSuccess }) => onSuccess({ isTimesheetSetUp: false }),
        };

        const { wrapper } = constructTimesheetModule({ integration });

        const payrollSettingsLink = findButtonWithTestId(wrapper, 'payrollSettingsLink');

        expect(payrollSettingsLink).toHaveLength(1);
      });

      it('redirects to payrollSettings', () => {
        const integration = {
          read: ({ onSuccess }) => onSuccess({ isTimesheetSetUp: false }),
        };

        const { wrapper } = constructTimesheetModule({ integration });

        const payrollSettingsLink = findButtonWithTestId(wrapper, 'payrollSettingsLink');
        payrollSettingsLink.simulate('click');

        expect(window.location.href.endsWith('payrollSettings')).toEqual(true);
      });
    });

    describe('timesheets set up', () => {
      it('renders timesheet table if timesheet is set up', () => {
        const integration = {
          read: ({ onSuccess }) => onSuccess({ isTimesheetSetUp: true }),
        };

        const { wrapper } = constructTimesheetModule({ integration });
        const timesheetTable = findComponentWithTestId(wrapper, 'timesheetTable', 'LineItemTable');

        expect(timesheetTable).toHaveLength(1);
      });
    });

    describe('EmployeeSelect', () => {
      it('sets the selected employee id on change', () => {
        const { wrapper, module } = constructTimesheetModule({});

        const employeeSelect = wrapper.find({ testid: 'employeeSelect' });
        employeeSelect.prop('onChange')({ id: 2, employeeId: 'EMP002' });

        expect(module.store.getState().selectedEmployeeId).toEqual(2);
      });
    });
  });
});
