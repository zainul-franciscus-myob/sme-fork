import { mount } from 'enzyme';

import { findButtonWithTestId } from '../../../../common/tests/selectors';
import DeleteModal from '../../../../components/modal/DeleteModal';
import EmployeeDetailModule from '../EmployeeDetailModule';
import employeeDetailLoadResponse from '../../mappings/data/employeeDetailEntry';

describe('EmployeeDetailModule', () => {
  const constructEmployeeDetailModule = () => {
    const integration = {
      read: ({ onSuccess }) => {
        onSuccess({ ...employeeDetailLoadResponse, isPayrollSetup: true });
      },
      write: () => {},
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const employeeDetailModule = new EmployeeDetailModule({
      integration,
      setRootView,
      popMessages: () => [],
      pushMessage: [],
      replaceURLParams: () => {},
    });
    employeeDetailModule.run({
      isPayrollSetup: true,
    });

    wrapper.update();
    return wrapper;
  };

  describe('Delete button', () => {
    it('renders the delete button', () => {
      const wrapper = constructEmployeeDetailModule();
      const deleteButton = findButtonWithTestId(wrapper, 'test_delete_button');

      expect(deleteButton).toHaveLength(1);
    });

    it('renders the delete confirmation modal on delete button click', () => {
      const wrapper = constructEmployeeDetailModule();
      const deleteButton = findButtonWithTestId(wrapper, 'test_delete_button');
      deleteButton.simulate('click');
      wrapper.update();
      const deleteConfirmationModal = wrapper.find(DeleteModal);

      expect(deleteConfirmationModal).toHaveLength(1);
    });
  });
});
