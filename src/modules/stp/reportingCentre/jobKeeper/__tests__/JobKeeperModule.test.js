import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import {
  LOAD_EMPLOYEES_BENEFIT_REPORT,
  LOAD_INITIAL_JOB_KEEPER_EMPLOYEES,
} from '../JobKeeperIntents';
import JobKeeperModule from '../JobKeeperModule';
import loadJobKeeperInitialEmployees from '../../mappings/data/loadJobKeeperInitialEmployees';
import openBlob from '../../../../../common/blobOpener/openBlob';

jest.mock('../../../../../common/blobOpener/openBlob');

describe('jobKeeperModule', () => {
  const constructModule = (
    module = new JobKeeperModule({
      integration: {
        read: ({ onSuccess }) => onSuccess(loadJobKeeperInitialEmployees),
      },
      pushMessage: () => {},
      featureToggles: {
        isJobKeeperReportingEnabled: true,
        isJobKeeper2Enabled: true,
      },
    })
  ) => {
    const setAlertMock = jest.fn();
    const wrapper = mount(module.getView());
    module.run();
    wrapper.update();

    return {
      wrapper,
      module,
      setAlertMock,
    };
  };

  it('renders header', () => {
    const { wrapper } = constructModule();

    const header = wrapper.find({ testid: 'jobKeeperPaymentHeader' });

    expect(header).toHaveLength(1);
  });

  it('renders reporting button when feature toggle on', () => {
    const { wrapper } = constructModule();

    const panel = wrapper.find({ testid: 'jobKeeperReportsPanel' });

    expect(
      panel.find({ testid: 'job-keeper-reports-btn' }).find('Button')
    ).toHaveLength(1);
  });

  it('hides reporting button when feature toggle off', () => {
    const read = jest.fn();
    const module = new JobKeeperModule({
      integration: {
        read,
      },
      pushMessage: () => {},
      featureToggles: {
        isJobKeeperReportingEnabled: false,
      },
    });
    const { wrapper } = constructModule(module);

    const panel = wrapper.find({ testid: 'jobKeeperReportsPanel' });

    expect(panel).toHaveLength(0);
  });

  it('reporting calls API with correct month value', () => {
    const read = jest.fn();
    const module = new JobKeeperModule({
      integration: {
        read,
        readFile: read,
      },
      pushMessage: () => {},
      featureToggles: {
        isJobKeeperReportingEnabled: true,
      },
    });
    const { wrapper } = constructModule(module);

    const panel = wrapper.find({ testid: 'jobKeeperReportsPanel' });
    panel.find('select').simulate('change', { target: { value: 3 } });
    const button = panel.find('Button');
    button.simulate('click');
    expect(read.mock.calls[1][0].urlParams.month).toBe(3);
  });

  describe('tryToNavigate', () => {
    it('calls the navigation function when there is no change', () => {
      const { module } = constructModule();
      const navFunction = jest.fn();

      module.tryToNavigate(navFunction);

      expect(navFunction).toHaveBeenCalled();
    });

    it('opens the unsaved changes modal when the table is dirty', () => {
      const { module, wrapper } = constructModule();
      const navFunction = jest.fn();
      module.openUnsavedChangesModal = jest.fn(module.openUnsavedChangesModal);
      module.updateEmployeeRow({
        key: 'firstFortnight',
        value: '05',
        rowId: loadJobKeeperInitialEmployees.employees[0].employeeId,
      });

      module.tryToNavigate(navFunction);
      wrapper.update();

      expect(navFunction).not.toHaveBeenCalled();
      expect(module.openUnsavedChangesModal).toHaveBeenCalledWith(navFunction);
      expect(module.store.getState()).toEqual(
        expect.objectContaining({
          unsavedChangesModalIsOpen: true,
          isDirty: true,
        })
      );
    });
  });

  describe('onPayrollYearChange', () => {
    it('calls filterEmployeeByYear when there is no change', () => {
      const { module } = constructModule();
      module.filterEmployeesByYear = jest.fn(module.filterEmployeesByYear);

      module.onPayrollYearChange('2020');

      expect(module.filterEmployeesByYear).toHaveBeenCalled();
    });

    it('opens the unsaved modal when the table is dirty', () => {
      const { module, wrapper } = constructModule();
      module.filterEmployeesByYear = jest.fn(module.filterEmployeesByYear);
      module.openUnsavedChangesModal = jest.fn(module.openUnsavedChangesModal);
      module.updateEmployeeRow({
        key: 'firstFortnight',
        value: '05',
        rowId: loadJobKeeperInitialEmployees.employees[0].employeeId,
      });

      module.onPayrollYearChange('2020');
      wrapper.update();

      expect(module.filterEmployeesByYear).not.toHaveBeenCalled();
      expect(module.openUnsavedChangesModal).toHaveBeenCalled();
      expect(module.store.getState()).toEqual(
        expect.objectContaining({
          unsavedChangesModalIsOpen: true,
          isDirty: true,
        })
      );
    });
  });

  describe('JobKeeper 2.0', () => {
    describe('with toggle isJobKeeper2Enabled', () => {
      it('show 12 items in month dropdown when JK2 feature toggle is on', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: true,
          },
        });
        const { wrapper } = constructModule(module);

        const panel = wrapper.find({ testid: 'jobKeeperReportsPanel' });
        const options = panel.find('Select').find('Option');

        expect(options.length).toBe(12);
      });

      it('show 6 items in month dropdown when JK2 feature toggle is off', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: false,
          },
        });
        const { wrapper } = constructModule(module);

        const panel = wrapper.find({ testid: 'jobKeeperReportsPanel' });
        const options = panel.find('Select').find('Option');

        expect(options.length).toBe(6);
      });

      it('shows employee tier column when feature toggle on', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: true,
          },
        });

        const { wrapper } = constructModule(module);
        const employeeTier = wrapper.find({ testId: 'test-employee-tier' });

        expect(employeeTier).toHaveLength(1);
      });

      it('hides employee tier column when feature toggle off', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: false,
          },
        });

        const { wrapper } = constructModule(module);
        const employeeTier = wrapper.find({ testId: 'test-employee-tier' });

        expect(employeeTier).toHaveLength(0);
      });

      it('shows tooltips when feature toggle on', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: true,
          },
        });

        const { wrapper } = constructModule(module);
        const firstFortnight = wrapper.find({
          testId: 'test-firstFortnight-tooltip',
        });
        const finalFortnight = wrapper.find({
          testId: 'test-finalFortnight-tooltip',
        });

        expect(firstFortnight).toHaveLength(1);
        expect(finalFortnight).toHaveLength(1);
      });

      it('hides tooltips when feature toggle off', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: false,
          },
        });

        const { wrapper } = constructModule(module);
        const firstFortnight = wrapper.find({
          testId: 'test-firstFortnight-tooltip',
        });
        const finalFortnight = wrapper.find({
          testId: 'test-finalFortnight-tooltip',
        });

        expect(firstFortnight).toHaveLength(0);
        expect(finalFortnight).toHaveLength(0);
      });

      it('shows new alert and hides old info when feature toggle on', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: true,
          },
        });

        const { wrapper } = constructModule(module);
        const newAlert = wrapper.find({
          testId: 'test-new-JK-warning',
        });
        const oldInfo = wrapper.find({
          testId: 'test-old-JK-info',
        });

        expect(newAlert).toHaveLength(1);
        expect(oldInfo).toHaveLength(0);
      });

      it('hides new alert and shows old info when feature toggle off', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: false,
          },
        });

        const { wrapper } = constructModule(module);
        const newAlert = wrapper.find({
          testId: 'test-new-JK-warning',
        });
        const oldInfo = wrapper.find({
          testId: 'test-old-JK-info',
        });

        expect(newAlert).toHaveLength(0);
        expect(oldInfo).toHaveLength(1);
      });

      it('able to dismiss initial warning', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
            readFile: read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: true,
          },
        });

        module.dismissInitWarning();

        const { wrapper } = constructModule(module);
        const newAlert = wrapper.find({
          testId: 'test-new-JK-warning',
        });
        const oldInfo = wrapper.find({
          testId: 'test-old-JK-info',
        });

        expect(newAlert).toHaveLength(0);
        expect(oldInfo).toHaveLength(0);
      });

      it('shows fixed current payroll year when feature toggle on', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: true,
          },
        });

        const { wrapper } = constructModule(module);
        const newPayrollYear = wrapper.find({
          testId: 'JK2-payroll-year-current-fixed',
        });
        const oldPayrollYear = wrapper.find({
          testId: 'JK1-payroll-year-selector',
        });

        expect(newPayrollYear).toHaveLength(1);
        expect(oldPayrollYear).toHaveLength(0);
      });

      it('shows payroll year selectors when feature toggle off', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeper2Enabled: false,
          },
        });

        const { wrapper } = constructModule(module);
        const newPayrollYear = wrapper.find({
          testId: 'JK2-payroll-year-current-fixed',
        });
        const oldPayrollYear = wrapper
          .find({
            testId: 'JK1-payroll-year-selector',
          })
          .first();

        expect(newPayrollYear).toHaveLength(0);
        expect(oldPayrollYear).toHaveLength(1);
      });
    });

    describe('with toggle isJobKeeperTierSuggestionEnabled', () => {
      it('should render employee tier report button when feature toggle jobkeeper 2.0 is enabled', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: false,
            isJobKeeperTierSuggestionEnabled: true,
          },
        });
        const { wrapper } = constructModule(module);

        const panel = wrapper.find({ testid: 'jobKeeperTableHeader' });
        expect(
          panel.find({ testid: 'employee-benefit-report-btn' }).find('Button')
            .length
        ).toBe(1);
      });

      it('should not render employee tier report button when feature toggle jobkeeper 2.0 is disabled', () => {
        const read = jest.fn();
        const module = new JobKeeperModule({
          integration: {
            read,
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: true,
            isJobKeeperTierSuggestionEnabled: false,
          },
        });
        const { wrapper } = constructModule(module);

        const panel = wrapper.find({ testid: 'jobKeeperTableHeader' });
        expect(
          panel.find({ testid: 'employee-benefit-report-btn' }).find('Button')
            .length
        ).toBe(0);
      });

      it('calls the open employee tier report function when open report is clicked', () => {
        const module = new JobKeeperModule({
          integration: {
            read: jest.fn(),
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: true,
            isJobKeeperTierSuggestionEnabled: true,
          },
        });
        module.onOpenEmployeeBenefitModal = jest.fn(
          module.onOpenEmployeeBenefitModal
        );
        const { wrapper } = constructModule(module);

        wrapper
          .find({ testid: 'employee-benefit-report-btn' })
          .find('Button')
          .simulate('click');

        expect(module.onOpenEmployeeBenefitModal).toHaveBeenCalled();
      });

      it('calls the close modal function when open report is clicked', () => {
        const module = new JobKeeperModule({
          integration: {
            read: ({ onSuccess }) => onSuccess(loadJobKeeperInitialEmployees),
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: true,
            isJobKeeperTierSuggestionEnabled: true,
          },
        });
        module.onCloseEmployeeBenefitModal = jest.fn(
          module.onCloseEmployeeBenefitModal
        );
        const { wrapper } = constructModule(module);

        wrapper
          .find({ testid: 'employee-benefit-report-btn' })
          .find('Button')
          .simulate('click');

        wrapper
          .find({ testid: 'cancel-employee-benefit-modal-btn' })
          .find('Button')
          .simulate('click');

        expect(module.onCloseEmployeeBenefitModal).toHaveBeenCalled();
      });

      it('should show list of employees', () => {
        const module = new JobKeeperModule({
          integration: {
            read: ({ onSuccess }) => onSuccess(loadJobKeeperInitialEmployees),
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: true,
            isJobKeeperTierSuggestionEnabled: true,
          },
        });

        const { wrapper } = constructModule(module);

        wrapper
          .find({ testid: 'employee-benefit-report-btn' })
          .find('Button')
          .simulate('click');

        expect(
          wrapper.find('EmployeeBenefitReportModal').find(Table.Row).length
        ).toBe(loadJobKeeperInitialEmployees.employees.length);
      });

      it('should call open Blob to view employee benefit report', () => {
        const module = new JobKeeperModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              switch (intent) {
                case LOAD_INITIAL_JOB_KEEPER_EMPLOYEES:
                  onSuccess(loadJobKeeperInitialEmployees);
                  break;
                default:
                  throw new Error(`unmocked intent "${intent.toString()}"`);
              }
            },
            readFile: ({ intent, onSuccess }) => {
              switch (intent) {
                case LOAD_EMPLOYEES_BENEFIT_REPORT:
                  onSuccess('abc');
                  break;
                default:
                  throw new Error(`unmocked intent "${intent.toString()}"`);
              }
            },
          },
          pushMessage: () => {},
          featureToggles: {
            isJobKeeperReportingEnabled: true,
            isJobKeeper2Enabled: true,
            isJobKeeperTierSuggestionEnabled: true,
          },
        });

        const { wrapper } = constructModule(module);

        wrapper
          .find({ testid: 'employee-benefit-report-btn' })
          .find('Button')
          .simulate('click');

        wrapper
          .find({ testid: 'get-employee-benefit-report-btn' })
          .find('Button')
          .simulate('click');

        expect(openBlob).toHaveBeenCalled();
      });
    });
  });

  describe('STP declaration modal', () => {
    it('should set new event ID during declaration', () => {
      const module = new JobKeeperModule({
        integration: {},
        pushMessage: () => {},
        featureToggles: {},
      });
      const oldEventId = module.store.getState().eventId;

      module.openStpDeclarationModal();

      expect(module.store.getState().eventId).not.toEqual(oldEventId);
    });
  });
});
