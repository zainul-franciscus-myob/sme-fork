import { mount } from 'enzyme';

import { findButtonWithTestId, findComponentWithTestId } from '../../../../common/tests/selectors';
import { mainTabIds } from '../tabItems';
import DeleteModal from '../../../../components/modal/DeleteModal';
import EmployeeDetailModule from '../EmployeeDetailModule';
import TerminationConfirmModal from '../components/TerminationConfirmModal';
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
      isToggleOn: () => true,
    });
    employeeDetailModule.run({
      isPayrollSetup: true,
    });

    wrapper.update();
    return { wrapper, module: employeeDetailModule };
  };

  describe('Delete button', () => {
    it('renders the delete button', () => {
      const { wrapper } = constructEmployeeDetailModule();
      const deleteButton = findButtonWithTestId(wrapper, 'test_delete_button');

      expect(deleteButton).toHaveLength(1);
    });

    it('renders the delete confirmation modal on delete button click', () => {
      const { wrapper } = constructEmployeeDetailModule();
      const deleteButton = findButtonWithTestId(wrapper, 'test_delete_button');
      deleteButton.simulate('click');
      wrapper.update();
      const deleteConfirmationModal = wrapper.find(DeleteModal);

      expect(deleteConfirmationModal).toHaveLength(1);
    });
  });

  describe('Termination date confirmation modal', () => {
    const constructEmployeeDetailModuleAtPayrollDetails = () => {
      const { wrapper, module } = constructEmployeeDetailModule();

      module.dispatcher.setMainTab(mainTabIds.payrollDetails);
      wrapper.update();

      return { wrapper, module };
    };

    describe('termination date modified', () => {
      it('opens the modal on save click', () => {
        const { wrapper } = constructEmployeeDetailModuleAtPayrollDetails();
        const saveButton = findButtonWithTestId(wrapper, 'testSaveButton');
        const terminationDateField = findComponentWithTestId(wrapper, 'terminationDate', 'DatePicker');

        terminationDateField.prop('onSelect')({ value: '11-11-2011' });
        saveButton.simulate('click');
        wrapper.update();

        expect(wrapper.find(TerminationConfirmModal)).toHaveLength(1);
      });
    });

    describe('termination date not modified', () => {
      it('does not open the modal on save click', () => {
        const { wrapper } = constructEmployeeDetailModuleAtPayrollDetails();
        const saveButton = findButtonWithTestId(wrapper, 'testSaveButton');

        saveButton.simulate('click');

        expect(wrapper.find(TerminationConfirmModal)).toHaveLength(0);
      });
    });
  });
});
