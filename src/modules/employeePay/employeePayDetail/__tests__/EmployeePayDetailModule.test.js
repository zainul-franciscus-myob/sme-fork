import { Modal } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_EMPLOYEE_PAY_DETAIL } from '../EmployeePayDetailIntents';
import { findButtonWithTestId } from '../../../../common/tests/selectors';
import EmployeePayDetailModule from '../EmployeePayDetailModule';
import StpDeclarationModal from '../../../stp/stpDeclarationModal/components/StpDeclarationModal';
import StpRegistrationAlertModal from '../../../stp/stpRegistrationAlertModal/components/StpRegistrationAlertModal';
import loadEmployeePayDetail from '../../mappings/data/loadEmployeePayDetail';
import loadEmployeePayReversalPreviewDetail from '../../mappings/data/loadEmployeePayReversalPreviewDetail';

describe('EmployeePayDetailsModule', () => {
  describe('Employee pay detail module reversal', () => {
    const constructModule = () => {
      let wrapper;
      const setRootView = (component) => {
        wrapper = mount(component);
      };
      const module = new EmployeePayDetailModule({
        integration: {
          read: ({ onSuccess }) => {
            onSuccess(loadEmployeePayReversalPreviewDetail);
          },
          write: ({ onSuccess }) => onSuccess(),
        },
        setRootView,
      });
      module.run({ businessId: '1', region: 'au' });

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

    it('show payrun list after sending the reversal of employee pay transaction successfully', () => {
      const { wrapper, module } = constructModule();

      module.sendReversalEmployeePay();
      wrapper.update();

      expect(wrapper).toEqual({});
      expect(window.location.href).toEqual(
        expect.stringContaining('/#/au/1/payRun')
      );
    });
  });

  describe('Stp Declaration Modal', () => {
    const isDeletable = false;
    const isUserStpRegistered = true;
    const isReversible = true;
    const employeePayDetail = {
      ...loadEmployeePayDetail,
      isDeletable,
      isUserStpRegistered,
      isReversible,
    };

    const constructModule = () => {
      let wrapper;
      const setRootView = (component) => {
        wrapper = mount(component);
      };
      const module = new EmployeePayDetailModule({
        integration: {
          read: ({ intent, onSuccess }) => {
            if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
              onSuccess(employeePayDetail);
            } else {
              onSuccess(loadEmployeePayReversalPreviewDetail);
            }
          },
          write: ({ onSuccess }) => onSuccess(),
        },
        setRootView,
      });
      module.run({ businessId: '1', region: 'au' });

      return {
        wrapper,
        module,
      };
    };
    it('should open stp declaration modal when Record button is pressed', () => {
      const { wrapper, module } = constructModule();
      module.loadEmployeePayReversalPreviewDetail();
      wrapper.update();

      findButtonWithTestId(wrapper, 'view-record-reverse-btn').simulate(
        'click'
      );
      wrapper.update();

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(1);
      expect(module.stpDeclarationModule.onDeclared).toBe(
        module.sendReversalEmployeePay
      );
    });

    it('should not open stp declaration modal when Cancel button is pressed', () => {
      const { wrapper, module } = constructModule();
      module.loadEmployeePayReversalPreviewDetail();
      wrapper.update();

      findButtonWithTestId(wrapper, 'view-record-reverse-back-btn').simulate(
        'click'
      );
      wrapper.update();

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(0);
    });
  });

  describe('Stp Registration Alert Modal', () => {
    const isDeletable = false;
    const isUserStpRegistered = false;
    const isReversible = true;
    const employeePayDetail = {
      ...loadEmployeePayDetail,
      isDeletable,
      isUserStpRegistered,
      isReversible,
    };

    const constructModule = () => {
      let wrapper;
      const setRootView = (component) => {
        wrapper = mount(component);
      };
      const module = new EmployeePayDetailModule({
        integration: {
          read: ({ intent, onSuccess }) => {
            if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
              onSuccess(employeePayDetail);
            } else {
              onSuccess(loadEmployeePayReversalPreviewDetail);
            }
          },
          write: ({ onSuccess }) => onSuccess(),
        },
        setRootView,
      });
      module.run({ businessId: '1', region: 'au' });

      return {
        wrapper,
        module,
      };
    };

    it('should open stp registration alert modal when user is not registered to STP', () => {
      const { wrapper, module } = constructModule();
      module.loadEmployeePayReversalPreviewDetail();
      wrapper.update();

      findButtonWithTestId(wrapper, 'view-record-reverse-btn').simulate(
        'click'
      );
      wrapper.update();

      const registrationModal = wrapper.find(StpRegistrationAlertModal);
      expect(registrationModal.find(Modal)).toHaveLength(1);
      expect(module.stpRegistrationAlertModal.onContinue).toBe(
        module.sendReversalEmployeePay
      );
    });
  });

  describe('Render stp alert message', () => {
    it('should display alert message if isPending is true and isPayrollReversibleEnabled feature toggle is on', () => {
      const isPending = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isPending,
      };
      const constructModule = () => {
        let wrapper;
        const setRootView = (component) => {
          wrapper = mount(component);
        };
        const module = new EmployeePayDetailModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
          setRootView,
        });
        module.run({ businessId: '1', region: 'au' });

        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.loadEmployeePayDetail();
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

    it('should not display alert message if isPending is false', () => {
      const isPending = false;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isPending,
      };
      const constructModule = () => {
        let wrapper;
        const setRootView = (component) => {
          wrapper = mount(component);
        };
        const module = new EmployeePayDetailModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
          setRootView,
        });
        module.run({ businessId: '1', region: 'au' });

        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.loadEmployeePayDetail();
      wrapper.update();

      expect(wrapper.find({ testid: 'pending-alert-message-id' })).toHaveLength(
        0
      );
    });

    it('should not display alert message if isPending and isRejected is true but isPayrollReversibleEnabled feature toggle is off', () => {
      const isPending = true;
      const isRejected = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isPending,
        isRejected,
      };
      const constructModule = () => {
        let wrapper;
        const setRootView = (component) => {
          wrapper = mount(component);
        };
        const module = new EmployeePayDetailModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          setRootView,
          featureToggles: { isPayrollReversibleEnabled: false },
        });
        module.run({ businessId: '1', region: 'au' });

        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.loadEmployeePayDetail();
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

      const constructModule = () => {
        let wrapper;
        const setRootView = (component) => {
          wrapper = mount(component);
        };
        const module = new EmployeePayDetailModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
          setRootView,
        });
        module.run({ businessId: '1', region: 'au' });

        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();

      module.loadEmployeePayDetail();
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

  describe('Render Delete button', () => {
    it('should not render delete button if isDeletable is false and feature toggle in on', () => {
      const isDeletable = false;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isDeletable,
      };

      const constructModule = () => {
        let wrapper;
        const setRootView = (component) => {
          wrapper = mount(component);
        };
        const module = new EmployeePayDetailModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          setRootView,
          featureToggles: { isPayrollReversibleEnabled: true },
        });
        module.run({ businessId: '1', region: 'au' });

        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();
      module.loadEmployeePayDetail();
      wrapper.update();

      expect(wrapper.find({ testid: 'pay-detail-delete-btn' })).toHaveLength(0);
    });

    it('renders delete button if isDeletable is true', () => {
      const isDeletable = true;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isDeletable,
      };

      const constructModule = () => {
        let wrapper;
        const setRootView = (component) => {
          wrapper = mount(component);
        };
        const module = new EmployeePayDetailModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: true },
          setRootView,
        });
        module.run({ businessId: '1', region: 'au' });

        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();
      module.loadEmployeePayDetail();
      wrapper.update();

      expect(
        wrapper.find({ testid: 'pay-detail-delete-btn' })
      ).not.toHaveLength(0);
    });

    it('should render delete button if isDeletale is false and feature toggle is off', () => {
      const isDeletable = false;
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        isDeletable,
      };

      const constructModule = () => {
        let wrapper;
        const setRootView = (component) => {
          wrapper = mount(component);
        };
        const module = new EmployeePayDetailModule({
          integration: {
            read: ({ intent, onSuccess }) => {
              if (intent === LOAD_EMPLOYEE_PAY_DETAIL) {
                onSuccess(employeePayDetail);
              }
            },
            write: ({ onSuccess }) => onSuccess(),
          },
          featureToggles: { isPayrollReversibleEnabled: false },
          setRootView,
        });
        module.run({ businessId: '1', region: 'au' });

        return {
          wrapper,
          module,
        };
      };
      const { wrapper, module } = constructModule();
      module.loadEmployeePayDetail();
      wrapper.update();

      expect(
        wrapper.find({ testid: 'pay-detail-delete-btn' })
      ).not.toHaveLength(0);
    });
  });
});
