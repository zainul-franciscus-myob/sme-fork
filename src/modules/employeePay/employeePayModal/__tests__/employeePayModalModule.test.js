import { Modal } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import {
  LOAD_EMPLOYEE_PAY_MODAL,
  SET_MODAL_IS_OPEN,
} from '../EmployeePayModalIntents';
import { findButtonWithTestId } from '../../../../common/tests/selectors';
import EmployeePayModalModule from '../EmployeePayModalModule';
import StpDeclarationModal from '../../../stp/stpDeclarationModal/components/StpDeclarationModal';
import loadEmployeePayDetail from '../../mappings/data/loadEmployeePayDetail';
import loadEmployeePayReversalPreviewDetail from '../../mappings/data/loadEmployeePayReversalPreviewDetail';

describe('employeePayModalModule', () => {
  describe('employeePayModalModule without feature toggles', () => {
    const constructModule = (
      module = new EmployeePayModalModule({
        integration: {
          read: ({ intent, onSuccess }) => {
            if (intent === SET_MODAL_IS_OPEN) {
              onSuccess(true);
            } else {
              onSuccess(loadEmployeePayReversalPreviewDetail);
            }
          },
          write: ({ onSuccess }) => onSuccess(),
        },
      })
    ) => {
      const wrapper = mount(module.getView());
      module.openModal({ businessId: '1', region: 'au' });
      wrapper.update();

      return {
        wrapper,
        module,
      };
    };

    it('renders reversal info message when response is reversal', () => {
      const { wrapper, module } = constructModule();
      module.loadEmployeePayReversalPreviewDetail();
      wrapper.update();

      const header = wrapper.find({ testid: 'reversalInfoMsg' });

      expect(header).toHaveLength(1);
    });

    it('should not render delete buttons if readonly state is true', () => {
      const { wrapper, module } = constructModule();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: true,
      });
      wrapper.update();

      expect(
        findButtonWithTestId(wrapper, 'employee-pay-modal-delete-btn')
      ).toHaveLength(0);
    });

    it('should not render reverse buttons if feature toggle isPayrollReversibleEnabled is not enabled', () => {
      const { wrapper, module } = constructModule();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(
        findButtonWithTestId(wrapper, 'modal-preview-reverse-btn')
      ).toHaveLength(0);
    });

    it('clear modal after sending the reversal of employee pay transaction successfully', () => {
      const { wrapper, module } = constructModule();

      module.sendReversalEmployeePay();
      wrapper.update();

      expect(wrapper).toEqual({});
      expect(window.location.href).toEqual(
        expect.stringContaining('/#/au/1/payRun')
      );
    });
  });

  describe('construct module with Feature toggles', () => {
    const constructModuleWithFT = (
      module = new EmployeePayModalModule({
        integration: {
          read: ({ intent, onSuccess }) => {
            if (intent === SET_MODAL_IS_OPEN) {
              onSuccess(true);
            } else {
              onSuccess(loadEmployeePayReversalPreviewDetail);
            }
          },
        },
        onDelete: {},
        featureToggles: { isPayrollReversibleEnabled: true },
      })
    ) => {
      const wrapper = mount(module.getView());
      module.openModal({});
      wrapper.update();

      return {
        wrapper,
        module,
      };
    };

    it('should render reverse buttons if feature toggle isPayrollReversibleEnabled is true', () => {
      const { wrapper, module } = constructModuleWithFT();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(
        findButtonWithTestId(wrapper, 'modal-preview-reverse-btn')
      ).toHaveLength(1);
    });
  });

  describe('Stp Declaration Modal', () => {
    const constructModuleWithModal = (
      module = new EmployeePayModalModule({
        integration: {
          read: ({ intent, onSuccess }) => {
            if (intent === SET_MODAL_IS_OPEN) {
              onSuccess(true);
            } else {
              onSuccess(loadEmployeePayReversalPreviewDetail);
            }
          },
        },
        onDelete: {},
        featureToggles: { isPayrollReversibleEnabled: true },
      })
    ) => {
      const wrapper = mount(module.getView());
      module.openModal({});
      wrapper.update();

      return {
        wrapper,
        module,
      };
    };

    it('should open stp declaration modal', () => {
      const { wrapper, module } = constructModuleWithModal();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      findButtonWithTestId(wrapper, 'modal-preview-reverse-btn').simulate(
        'click'
      );
      findButtonWithTestId(wrapper, 'modal-record-reverse-btn').simulate(
        'click'
      );

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(1);
      expect(module.stpDeclarationModule.onDeclared).toBe(
        module.sendReversalEmployeePay
      );
    });
  });

  describe('Render Delete button', () => {
    it('should not render delete button if readonly state is true and isDeletable is false', () => {
      const isDeletable = false;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isDeletable,
      };

      const constructModule = (
        module = new EmployeePayModalModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === SET_MODAL_IS_OPEN) {
                onSuccess(true);
              }
              if (intent === LOAD_EMPLOYEE_PAY_MODAL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
        })
      ) => {
        const wrapper = mount(module.getView());
        return {
          wrapper,
          module,
        };
      };

      const { wrapper, module } = constructModule();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: true,
      });
      wrapper.update();

      expect(
        wrapper.find({ testid: 'employee-pay-modal-delete-btn' })
      ).toHaveLength(0);
    });

    it('should render delete button if readonly state is false and isDeletable is true', () => {
      const isDeletable = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isDeletable,
      };

      const constructModule = (
        module = new EmployeePayModalModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === SET_MODAL_IS_OPEN) {
                onSuccess(true);
              }
              if (intent === LOAD_EMPLOYEE_PAY_MODAL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
        })
      ) => {
        const wrapper = mount(module.getView());
        return {
          wrapper,
          module,
        };
      };

      const { wrapper, module } = constructModule();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(
        wrapper.find({ testid: 'employee-pay-modal-delete-btn' })
      ).toHaveLength(1);
    });

    it('should render delete button if readonly state is false and isDeletable is true but feature toggle is off', () => {
      const isDeletable = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isDeletable,
      };

      const constructModule = (
        module = new EmployeePayModalModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === SET_MODAL_IS_OPEN) {
                onSuccess(true);
              }
              if (intent === LOAD_EMPLOYEE_PAY_MODAL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: false },
        })
      ) => {
        const wrapper = mount(module.getView());
        return {
          wrapper,
          module,
        };
      };

      const { wrapper, module } = constructModule();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(
        wrapper.find({ testid: 'employee-pay-modal-delete-btn' })
      ).toHaveLength(1);
    });
  });

  describe('Render stp alert message', () => {
    it('should display alert message if stp alert message exists and isPayrollReversibleEnabled feature toggle is on', () => {
      const isPending = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isPending,
      };
      const constructModule = (
        module = new EmployeePayModalModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === SET_MODAL_IS_OPEN) {
                onSuccess(true);
              }
              if (intent === LOAD_EMPLOYEE_PAY_MODAL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
        })
      ) => {
        const wrapper = mount(module.getView());
        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(wrapper.find({ testid: 'pending-alert-message-id' })).toHaveLength(
        1
      );
      expect(
        wrapper.find({ testid: 'pending-alert-message-id' }).text()
      ).toEqual(
        'This pay is still processing to the ATO for Single Touch Payroll reporting. If you need to reverse the pay, you will be able to, once it has processed. You can check the status of the pay in Single Touch Payroll reporting'
      );
    });

    it('should not display alert message if isPending is false and isPayrollReversibleEnabled feature toggle is on', () => {
      const isPending = false;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isPending,
      };
      const constructModule = (
        module = new EmployeePayModalModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === SET_MODAL_IS_OPEN) {
                onSuccess(true);
              }
              if (intent === LOAD_EMPLOYEE_PAY_MODAL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
        })
      ) => {
        const wrapper = mount(module.getView());
        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(wrapper.find({ testid: 'pending-alert-message-id' })).toHaveLength(
        0
      );
    });

    it('should not display alert message if isPending and isRejected is true and isPayrollReversibleEnabled feature toggle is off', () => {
      const isPending = true;
      const isRejected = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isPending,
        isRejected,
      };
      const constructModule = (
        module = new EmployeePayModalModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === SET_MODAL_IS_OPEN) {
                onSuccess(true);
              }
              if (intent === LOAD_EMPLOYEE_PAY_MODAL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: false },
        })
      ) => {
        const wrapper = mount(module.getView());
        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(wrapper.find({ testid: 'pending-alert-message-id' })).toHaveLength(
        0
      );
      expect(wrapper.find({ testid: 'reject-alert-message-id' })).toHaveLength(
        0
      );
    });

    it('should display alert message if payrun is isRejected and isPayrollReversibleEnabled feature toggle is on', () => {
      const isRejected = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isRejected,
      };
      const constructModule = (
        module = new EmployeePayModalModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === SET_MODAL_IS_OPEN) {
                onSuccess(true);
              }
              if (intent === LOAD_EMPLOYEE_PAY_MODAL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
        })
      ) => {
        const wrapper = mount(module.getView());
        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(wrapper.find({ testid: 'reject-alert-message-id' })).toHaveLength(
        1
      );
      expect(
        wrapper.find({ testid: 'reject-alert-message-id' }).text()
      ).toEqual(
        'This pay was rejected by the ATO for Single Touch Payroll reporting. You can delete the pay, and the deletion does not need to be reported. We recommend fixing the reason for the rejection, so you don’t continue to have rejected reports.Learn More'
      );
    });
  });
});
