import { Modal, Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR, LOAD_INITIAL_EMPLOYEES_AND_HEADERS, SUBMIT_EMPLOYEES_FINALISATION } from '../FinalisationIntents';
import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import FinalisationModule from '../FinalisationModule';
import StpDeclarationModal from '../../../stpDeclarationModal/components/StpDeclarationModal';
import loadEmployeesAndHeadersForYear from '../../mappings/data/loadFinalisationEmployeesAndHeaderDetailsForYearResponse';
import loadFinalisation from '../../mappings/data/loadFinalisationInitialEmployeesAndHeaderDetailsResponse';

describe('FinalisationModule', () => {
  const defaultIntegration = {
    read: ({ intent, onSuccess }) => {
      switch (intent) {
        case LOAD_INITIAL_EMPLOYEES_AND_HEADERS:
          onSuccess(loadFinalisation);
          break;
        case LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR:
          onSuccess({
            employees: [
              {
                name: 'NEW USER',
                id: '123',
              },
            ],
          });
          break;
        default:
          throw new Error(`unmocked intent "${intent.toString()}"`);
      }
    },
  };

  const constructModule = (integration) => {
    const setAlertMock = jest.fn();
    const module = new FinalisationModule({
      integration: {
        ...defaultIntegration,
        ...integration,
      },
      setAlert: setAlertMock,
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

  describe('Payroll year selector', () => {
    it('fetches new information on change', () => {
      const { wrapper } = constructModule();
      const payrollYearField = wrapper.find({ testid: 'payrollYearFilter' });

      expect(payrollYearField).toHaveLength(1);
      payrollYearField.prop('onPayrollYearChange')('2019');
      wrapper.update();

      expect(wrapper.find(Table.Row)).toHaveLength(1);
      expect(wrapper.find(Table.Row).first().text()).toContain('NEW USER');
    });
  });

  describe('submitEmployeesFinalisation', () => {
    it('calls integration write with the intent', () => {
      const integration = {
        write: jest.fn(),
      };
      const { module } = constructModule(integration);

      module.submitEmployeesFinalisation();

      expect(integration.write).toHaveBeenCalledWith(expect.objectContaining({
        intent: SUBMIT_EMPLOYEES_FINALISATION,
      }));
    });
  });

  describe('declaration modal', () => {
    it('renders the declaration modal when the finalise button is clicked', () => {
      const { wrapper, module } = constructModule();

      module.selectAllEmployees(true);
      wrapper.update();

      const finaliseButton = findButtonWithTestId(wrapper, 'finaliseButton');
      expect(finaliseButton).toHaveLength(1);

      finaliseButton.simulate('click');
      wrapper.update();

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(1);
      expect(module.stpDeclarationModalModule.onDeclared).toBe(module.submitEmployeesFinalisation);
    });

    it('renders the declaration modal when the remove finalisation button is clicked', () => {
      const { wrapper, module } = constructModule();

      module.selectAllEmployees(true);
      wrapper.update();

      const finaliseButton = findButtonWithTestId(wrapper, 'removeFinalisationButton');
      expect(finaliseButton).toHaveLength(1);

      finaliseButton.simulate('click');
      wrapper.update();

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(1);
      expect(module.stpDeclarationModalModule.onDeclared).toBe(
        module.submitEmployeesRemoveFinalisation,
      );
    });
  });

  describe('submitEmployeesFinalisation', () => {
    it('renders an error alert if the submission fails', () => {
      const errorMessage = 'Something has gone terribly wrong';
      const integration = {
        write: ({ onFailure }) => onFailure({ message: errorMessage }),
      };
      const { wrapper, module, setAlertMock } = constructModule(integration);

      module.submitEmployeesFinalisation();
      wrapper.update();

      expect(setAlertMock).toHaveBeenCalledWith({
        type: 'danger',
        message: errorMessage,
      });
    });

    it('renders an success alert if the submission succeeds', () => {
      const message = 'Something has gone terribly right';
      const integration = {
        write: ({ onSuccess }) => onSuccess({ message }),
      };
      const { wrapper, module, setAlertMock } = constructModule(integration);

      module.submitEmployeesFinalisation();
      wrapper.update();

      expect(setAlertMock).toHaveBeenCalledWith({
        type: 'success',
        message,
      });
    });

    it('reloads the employee list on success response', () => {
      const integration = {
        write: ({ onSuccess }) => onSuccess({ message: 'success message' }),
        read: jest.fn(({ intent, onSuccess }) => {
          if (intent === LOAD_INITIAL_EMPLOYEES_AND_HEADERS) {
            onSuccess(loadFinalisation);
          } else {
            onSuccess(loadEmployeesAndHeadersForYear);
          }
        }),
      };
      const { module } = constructModule(integration);

      module.submitEmployeesFinalisation();

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
      }));
    });
  });

  describe('submitEmployeesRemoveFinalisation', () => {
    it('renders an error alert if the submission fails', () => {
      const errorMessage = 'Something has gone terribly wrong';
      const integration = {
        write: ({ onFailure }) => onFailure({ message: errorMessage }),
      };
      const { wrapper, module, setAlertMock } = constructModule(integration);

      module.submitEmployeesRemoveFinalisation();
      wrapper.update();

      expect(setAlertMock).toHaveBeenCalledWith({
        type: 'danger',
        message: errorMessage,
      });
    });

    it('renders an success alert if the submission succeeds', () => {
      const message = 'Something has gone terribly right';
      const integration = {
        write: ({ onSuccess }) => onSuccess({ message }),
      };
      const { wrapper, module, setAlertMock } = constructModule(integration);

      module.submitEmployeesRemoveFinalisation();
      wrapper.update();

      expect(setAlertMock).toHaveBeenCalledWith({
        type: 'success',
        message,
      });
    });

    it('reloads the employee list on success response', () => {
      const integration = {
        write: ({ onSuccess }) => onSuccess({ message: 'success message' }),
        read: jest.fn(({ intent, onSuccess }) => {
          if (intent === LOAD_INITIAL_EMPLOYEES_AND_HEADERS) {
            onSuccess(loadFinalisation);
          } else {
            onSuccess(loadEmployeesAndHeadersForYear);
          }
        }),
      };
      const { module } = constructModule(integration);

      module.submitEmployeesRemoveFinalisation();

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
      }));
    });
  });

  describe('tryToNavigate', () => {
    it('calls the navigation function when the form is clean', () => {
      const { module } = constructModule();
      const navFunction = jest.fn();

      module.tryToNavigate(navFunction);

      expect(navFunction).toHaveBeenCalled();
    });

    it('opens the unsaved changes modal when the form is dirty', () => {
      const { module, wrapper } = constructModule();
      const navFunction = jest.fn();
      module.openUnsavedChangesModal = jest.fn(module.openUnsavedChangesModal);
      module.selectAllEmployees();

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
