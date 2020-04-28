import { mount } from 'enzyme';

import JobKeeperModule from '../JobKeeperModule';
import loadJobKeeperInitialEmployees from '../../mappings/data/loadJobKeeperInitialEmployees';

describe('jobKeeperModule', () => {
  const constructModule = () => {
    const setAlertMock = jest.fn();
    const module = new JobKeeperModule({
      integration: {
        read: ({ onSuccess }) => onSuccess(loadJobKeeperInitialEmployees),
      },
      pushMessage: () => {},
    });

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
      expect(module.store.getState()).toEqual(expect.objectContaining({
        unsavedChangesModalIsOpen: true,
        isDirty: true,
      }));
    });
  });
});
