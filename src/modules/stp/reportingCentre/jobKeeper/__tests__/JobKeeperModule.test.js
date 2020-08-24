import { mount } from 'enzyme';

import JobKeeperModule from '../JobKeeperModule';
import loadJobKeeperInitialEmployees from '../../mappings/data/loadJobKeeperInitialEmployees';

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

    expect(panel.find('.btn')).toHaveLength(1);
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

  it('shows employee tier when feature toggle on', () => {
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

  it('hides employee tier when feature toggle off', () => {
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
    const button = panel.find('.btn');
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
});
