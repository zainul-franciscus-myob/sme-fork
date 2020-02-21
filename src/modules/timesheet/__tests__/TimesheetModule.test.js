import { Alert, DatePicker, Modal } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import {
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_TIMESHEET,
  SAVE_TIMESHEET,
  SAVE_TIMESHEET_OLD,
} from '../timesheetIntents';
import { findButtonWithTestId, findComponentWithTestId } from '../../../common/tests/selectors';
import { getSelectedDate, getSelectedEmployeeId } from '../timesheetSelectors';
import HoursInput from '../../../components/autoFormatter/HoursInput/HoursInput';
import LoadingFailPageState from '../../../components/PageView/LoadingFailPageState';
import TimesheetModule from '../TimesheetModule';
import UnsavedModal from '../../../components/modal/UnsavedModal';
import loadEmployeeTimesheet from '../mappings/data/loadEmployeeTimesheet';
import loadTimesheet from '../mappings/data/loadTimesheet';
import loadTimesheetInitial from '../mappings/data/loadTimesheetInitial';

const selectEmployee = (wrapper) => {
  const employeeSelect = wrapper.find({ testid: 'employeeSelect' });
  employeeSelect.prop('onChange')({ id: 2, employeeId: 'EMP002' });
  wrapper.update();
};

describe('TimesheetModule', () => {
  const defaultIntegration = {
    read: ({ onSuccess, intent }) => {
      if (intent === LOAD_INITIAL_TIMESHEET) {
        onSuccess(loadTimesheetInitial);
      } else { onSuccess(loadEmployeeTimesheet); }
    },
    write: jest.fn(),
  };

  const defaultFeatureToggles = {
    isFeatureTimesheetEnabled: false,
  };

  const constructTimesheetModule = ({
    integration, featureToggles = defaultFeatureToggles,
  }) => {
    const moduleIntegration = {
      ...defaultIntegration,
      ...integration,
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const module = new TimesheetModule({
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

      it('requests the employees timesheet for the week', () => {
        const { wrapper, module } = constructTimesheetModule({});

        selectEmployee(wrapper);
        expect(module.store.getState().timesheetRows).toHaveLength(1);
      });
    });

    describe('Load initial timesheet', () => {
      it('shows the loading fail page view on request failure', () => {
        const failureMessage = 'Load initial timesheet failed.';
        const integration = {
          read: ({ onFailure }) => onFailure({ message: failureMessage }),
        };
        const { wrapper } = constructTimesheetModule({ integration });

        const loadingFailPageState = wrapper.find(LoadingFailPageState);

        expect(loadingFailPageState).toHaveLength(1);
      });
    });

    describe('loadSelectedEmployeeTimesheet', () => {
      it('shows the failure alert on request failure', () => {
        const failureMessage = 'Load employee timesheet failed.';
        const integration = {
          read: ({ intent, onSuccess, onFailure }) => {
            if (intent === LOAD_EMPLOYEE_TIMESHEET) {
              onFailure({ message: failureMessage });
            } else {
              onSuccess(loadTimesheetInitial);
            }
          },
        };
        const { wrapper } = constructTimesheetModule({ integration });
        const employeeSelect = wrapper.find({ testid: 'employeeSelect' });

        employeeSelect.prop('onChange')({ id: 2, employeeId: 'EMP002' });
        wrapper.update();

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.prop('type')).toEqual('danger');
        expect(alert.contains(failureMessage)).toBeTruthy();
      });
    });

    describe('onSelectedDateChange', () => {
      it('shows the failure alert on request failure', () => {
        const failureMessage = 'Load timesheet for date failed.';
        const integration = {
          read: ({ intent, onSuccess, onFailure }) => {
            if (intent === LOAD_TIMESHEET) {
              onFailure({ message: failureMessage });
            } else {
              onSuccess(loadTimesheetInitial);
            }
          },
        };
        const { wrapper } = constructTimesheetModule({ integration });
        const dateSelect = wrapper.find(DatePicker);

        dateSelect.prop('onSelect')({ value: '2020-02-02' });
        wrapper.update();

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.prop('type')).toEqual('danger');
        expect(alert.contains(failureMessage)).toBeTruthy();
      });
    });

    describe('saveTimesheet', () => {
      describe('save button', () => {
        it('is disabled when no employee is selected', () => {
          const { wrapper } = constructTimesheetModule({});
          const saveButton = findButtonWithTestId(wrapper, 'saveButton');

          expect(saveButton.prop('disabled')).toBeTruthy();
        });

        it('is enabled when an employee has been selected', () => {
          const { wrapper } = constructTimesheetModule({});

          const employeeSelect = wrapper.find({ testid: 'employeeSelect' });
          employeeSelect.prop('onChange')({ id: 2, employeeId: 'EMP002' });
          wrapper.update();

          const saveButton = findButtonWithTestId(wrapper, 'saveButton');
          expect(saveButton.prop('disabled')).toBeFalsy();
        });
      });

      it('shows failure alert when save failed', () => {
        const failureMessage = 'Save timesheet failed.';
        const integration = {
          read: ({ intent, onSuccess }) => {
            if (intent === LOAD_INITIAL_TIMESHEET) {
              onSuccess(loadTimesheetInitial);
            } else {
              onSuccess(loadEmployeeTimesheet);
            }
          },
          write: ({ onFailure }) => { onFailure({ message: failureMessage }); },
        };
        const { wrapper } = constructTimesheetModule({ integration });

        selectEmployee(wrapper);
        const saveButton = findButtonWithTestId(wrapper, 'saveButton');
        saveButton.simulate('click');
        wrapper.update();

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.prop('type')).toEqual('danger');
        expect(alert.contains(failureMessage)).toBeTruthy();
      });

      it('shows success alert when save succeeds', () => {
        const successMessage = 'Save timesheet succeeded.';
        const integration = {
          write: ({ onSuccess }) => { onSuccess({ message: successMessage }); },
        };
        const { wrapper } = constructTimesheetModule({ integration });

        selectEmployee(wrapper);
        const saveButton = findButtonWithTestId(wrapper, 'saveButton');
        saveButton.simulate('click');
        wrapper.update();

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.prop('type')).toEqual('success');
        expect(alert.contains(successMessage)).toBeTruthy();
      });
    });

    describe('deleteTimesheet', () => {
      describe('delete button', () => {
        it('is disabled when no employee is selected', () => {
          const { wrapper } = constructTimesheetModule({});
          const deleteButton = findButtonWithTestId(wrapper, 'deleteButton');

          expect(deleteButton.prop('disabled')).toBeTruthy();
        });

        it('is enabled when an employee has been selected', () => {
          const { wrapper } = constructTimesheetModule({});

          const employeeSelect = wrapper.find({ testid: 'employeeSelect' });
          employeeSelect.prop('onChange')({ id: 2, employeeId: 'EMP002' });
          wrapper.update();

          const deleteButton = findButtonWithTestId(wrapper, 'deleteButton');
          expect(deleteButton.prop('disabled')).toBeFalsy();
        });
      });

      it('shows failure alert when delete failed', () => {
        const failureMessage = 'Delete timesheet failed.';
        const integration = {
          read: ({ intent, onSuccess }) => {
            if (intent === LOAD_INITIAL_TIMESHEET) {
              onSuccess(loadTimesheetInitial);
            } else {
              onSuccess(loadEmployeeTimesheet);
            }
          },
          write: ({ onFailure }) => { onFailure({ message: failureMessage }); },
        };
        const { wrapper, module } = constructTimesheetModule({ integration });

        selectEmployee(wrapper);
        module.deleteTimesheet();
        wrapper.update();

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.prop('type')).toEqual('danger');
        expect(alert.contains(failureMessage)).toBeTruthy();
      });

      it('shows success alert when delete succeeds', () => {
        const successMessage = 'Delete timesheet succeeded.';
        const integration = {
          write: ({ onSuccess }) => { onSuccess({ message: successMessage }); },
        };
        const { wrapper, module } = constructTimesheetModule({ integration });

        selectEmployee(wrapper);
        module.deleteTimesheet();
        wrapper.update();

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.prop('type')).toEqual('success');
        expect(alert.contains(successMessage)).toBeTruthy();
      });

      it('shows the delete modal when you press the delete button', () => {
        const { wrapper } = constructTimesheetModule({});

        selectEmployee(wrapper);
        const deleteButton = findButtonWithTestId(wrapper, 'deleteButton');
        deleteButton.simulate('click');
        wrapper.update();

        const deleteModal = wrapper.find(Modal);
        expect(deleteModal).toHaveLength(1);
      });
    });
  });

  const simulateHoursInputChange = (component, value) => (
    component.prop('onChange')({ target: { rawValue: value, name: component.prop('name') } })
  );

  describe('Unsaved modal', () => {
    let originalUrl;

    beforeEach(() => {
      originalUrl = window.location.href;
    });

    afterEach(() => {
      window.location.href = originalUrl;
    });

    const createMockIntegration = () => ({
      write: jest.fn(({ onSuccess }) => { onSuccess({ message: 'successMessage' }); }),
      read: ({ intent, onSuccess }) => {
        switch (intent) {
          case LOAD_TIMESHEET:
            onSuccess(loadTimesheet);
            break;
          case LOAD_INITIAL_TIMESHEET:
            onSuccess(loadTimesheetInitial);
            break;
          case LOAD_EMPLOYEE_TIMESHEET:
            onSuccess(loadEmployeeTimesheet);
            break;
          default:
            throw Error(`unmocked integration read call: '${intent}'`);
        }
      },
    });

    const getSelectedEmployee = module => getSelectedEmployeeId(module.store.getState());

    const getSelectedDateFromState = module => getSelectedDate(module.store.getState());

    const makeTimesheetDirty = (wrapper) => {
      const hoursInput = wrapper.find(HoursInput).first();
      simulateHoursInputChange(hoursInput, '10');
    };

    const attemptToChangeSelectedEmployee = (wrapper, newEmployeeId) => {
      const employeeSelect = wrapper.find({ testid: 'employeeSelect' });
      employeeSelect.prop('onChange')({ id: newEmployeeId, employeeId: 'EMP001' });
      wrapper.update();
    };

    const attemptToChangeSelectedDate = (wrapper, newDate) => {
      const dateSelect = wrapper.find(DatePicker);
      dateSelect.prop('onSelect')({ value: newDate });
      wrapper.update();
    };

    it('does not render the unsaved modal if there are no unsaved changes', () => {
      const { module, wrapper } = constructTimesheetModule({});
      const newUrl = '#/SOME_NEW_URL';

      module.handlePageTransition(newUrl);

      expect(window.location.href).toEqual(expect.stringContaining(newUrl));
      expect(wrapper.find(UnsavedModal)).toHaveLength(0);
    });

    it('does not render the unsaved modal if update does not change any value', () => {
      const { module, wrapper } = constructTimesheetModule({});
      const newUrl = '#/SOME_NEW_URL';

      module.onHoursBlur(0, 'day1', '');
      module.handlePageTransition(newUrl);
      wrapper.update();

      expect(window.location.href).toEqual(expect.stringContaining(newUrl));
      expect(wrapper.find(UnsavedModal)).toHaveLength(0);
    });

    it('renders the unsaved modal even if the second update does not change any value', () => {
      const { module, wrapper } = constructTimesheetModule({});
      const initialUrl = window.location.href;
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);
      makeTimesheetDirty(wrapper);

      module.handlePageTransition('#/newUrl');
      wrapper.update();

      expect(window.location.href).toEqual(initialUrl);
      expect(wrapper.find(UnsavedModal)).toHaveLength(1);
    });

    it('renders the unsaved modal if there are unsaved changes', () => {
      const { module, wrapper } = constructTimesheetModule({});
      const initialUrl = window.location.href;
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);

      module.handlePageTransition('#/newUrl');
      wrapper.update();

      expect(window.location.href).toEqual(initialUrl);
      expect(wrapper.find(UnsavedModal)).toHaveLength(1);
    });

    it('does not save or make changes if Go back is clicked, only closes modal', () => {
      const integration = createMockIntegration();
      const { module, wrapper } = constructTimesheetModule({ integration });
      const initialUrl = window.location.href;
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);

      module.handlePageTransition('#/newUrl');
      wrapper.update();

      const unsavedModal = wrapper.find(UnsavedModal);
      expect(window.location.href).toEqual(initialUrl);
      expect(unsavedModal).toHaveLength(1);

      unsavedModal.prop('onCancel')();
      wrapper.update();

      expect(integration.write).not.toHaveBeenCalled();
      expect(window.location.href).toEqual(initialUrl);
      expect(wrapper.find(UnsavedModal)).toHaveLength(0);
    });

    it('can save and navigate to another page on confirm', () => {
      const integration = createMockIntegration();
      const { module, wrapper } = constructTimesheetModule({ integration });
      const initialUrl = window.location.href;
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);
      const newUrl = '#/newUrl';

      module.handlePageTransition(newUrl);
      wrapper.update();

      expect(window.location.href).toEqual(initialUrl);
      const unsavedModal = wrapper.find(UnsavedModal);
      expect(unsavedModal).toHaveLength(1);

      unsavedModal.prop('onConfirmSave')();

      expect(integration.write).toHaveBeenCalled();
      expect(window.location.href).toEqual(expect.stringContaining(newUrl));
    });

    it('can navigate to another page on discard', () => {
      const integration = createMockIntegration();
      const { module, wrapper } = constructTimesheetModule({ integration });
      const initialUrl = window.location.href;
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);
      const newUrl = '#/newUrl';

      // Attempt to visit a different page.
      module.handlePageTransition(newUrl);
      wrapper.update();

      expect(window.location.href).toEqual(initialUrl);
      const unsavedModal = wrapper.find(UnsavedModal);
      expect(unsavedModal).toHaveLength(1);

      unsavedModal.prop('onConfirmUnsave')();

      expect(integration.write).not.toHaveBeenCalled();
      expect(window.location.href).toEqual(expect.stringContaining(newUrl));
    });

    it('can save and change selected employee field on confirm', () => {
      const integration = createMockIntegration();
      const { module, wrapper } = constructTimesheetModule({ integration });
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);
      const initialEmployee = getSelectedEmployee(module);
      const newEmployee = 1;

      attemptToChangeSelectedEmployee(wrapper, newEmployee);

      // Selected employee should be unchanged.
      expect(getSelectedEmployee(module)).toEqual(initialEmployee);
      const unsavedModal = wrapper.find(UnsavedModal);
      expect(unsavedModal).toHaveLength(1);

      unsavedModal.prop('onConfirmSave')();

      expect(integration.write).toHaveBeenCalled();
      expect(getSelectedEmployee(module)).toEqual(newEmployee);
    });

    it('can change selected employee field on discard', () => {
      const integration = createMockIntegration();
      const { module, wrapper } = constructTimesheetModule({ integration });
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);
      const initialEmployee = getSelectedEmployee(module);
      const newEmployee = 1;

      attemptToChangeSelectedEmployee(wrapper, newEmployee);

      // Selected employee should be unchanged.
      expect(getSelectedEmployee(module)).toEqual(initialEmployee);
      const unsavedModal = wrapper.find(UnsavedModal);
      expect(unsavedModal).toHaveLength(1);

      unsavedModal.prop('onConfirmUnsave')();

      expect(integration.write).not.toHaveBeenCalled();
      expect(getSelectedEmployee(module)).toEqual(newEmployee);
    });

    it('can save and change selected date field on confirm', () => {
      const integration = createMockIntegration();
      const { module, wrapper } = constructTimesheetModule({ integration });
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);
      const initialDate = getSelectedDateFromState(module);
      const newDate = '2020-02-02';

      attemptToChangeSelectedDate(wrapper, newDate);

      // Selected date should be unchanged.
      expect(getSelectedDateFromState(module)).toEqual(initialDate);
      const unsavedModal = wrapper.find(UnsavedModal);
      expect(unsavedModal).toHaveLength(1);

      unsavedModal.prop('onConfirmSave')();

      expect(integration.write).toHaveBeenCalled();
      expect(getSelectedDateFromState(module)).toEqual(newDate);
    });

    it('can change selected date field on discard', () => {
      const integration = createMockIntegration();
      const { module, wrapper } = constructTimesheetModule({ integration });
      selectEmployee(wrapper);
      makeTimesheetDirty(wrapper);
      const initialDate = getSelectedDateFromState(module);
      const newDate = '2020-02-02';

      attemptToChangeSelectedDate(wrapper, newDate);

      // Selected date should be unchanged.
      expect(getSelectedDateFromState(module)).toEqual(initialDate);
      const unsavedModal = wrapper.find(UnsavedModal);
      expect(unsavedModal).toHaveLength(1);

      unsavedModal.prop('onConfirmUnsave')();

      expect(integration.write).not.toHaveBeenCalled();
      expect(getSelectedDateFromState(module)).toEqual(newDate);
    });
  });

  describe('isFeatureTimesheetEnabled', () => {
    it('calls SAVE_TIMESHEET when feature toggle is enabled', () => {
      const integration = {
        write: jest.fn(),
      };
      const featureToggles = {
        isFeatureTimesheetEnabled: true,
      };
      const { module } = constructTimesheetModule({ integration, featureToggles });

      module.saveTimesheet({});

      expect(integration.write).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: SAVE_TIMESHEET,
        }),
      );
    });

    it('calls SAVE_TIMESHEET_OLD when feature toggle is off', () => {
      const integration = {
        write: jest.fn(),
      };
      const featureToggles = {
        isFeatureTimesheetEnabled: false,
      };
      const { module } = constructTimesheetModule({ integration, featureToggles });

      module.saveTimesheet({});

      expect(integration.write).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: SAVE_TIMESHEET_OLD,
        }),
      );
    });
  });
});
