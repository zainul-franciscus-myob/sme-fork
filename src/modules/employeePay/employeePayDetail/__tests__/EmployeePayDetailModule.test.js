import { Modal } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_EMPLOYEE_PAY_DETAIL } from '../EmployeePayDetailIntents';
import { findButtonWithTestId } from '../../../../common/tests/selectors';
import EmployeePayDetailModule from '../EmployeePayDetailModule';
import StpDeclarationModal from '../../../stp/stpDeclarationModal/components/StpDeclarationModal';
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

  describe('Render stp alert message', () => {
    it('should display alert message if stp alert message exists and isPayrollReversibleEnabled feature toggle is on', () => {
      const stpAlertMessage = 'Some alert message';
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        stpAlertMessage,
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

      expect(wrapper.find({ testid: 'stp-alert-message-id' })).toHaveLength(1);
      expect(wrapper.find({ testid: 'stp-alert-message-id' }).text()).toEqual(
        stpAlertMessage
      );
    });

    it('should not display alert message if stp alert message does not exists', () => {
      const stpAlertMessage = '';
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        stpAlertMessage,
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

      expect(wrapper.find({ testid: 'stp-alert-message-id' })).toHaveLength(0);
    });

    it('should not display alert message if stp alert message does exists and isPayrollReversibleEnabled feature toggle is off', () => {
      const stpAlertMessage = 'Some alert message';
      const employeePayDetail = {
        ...loadEmployeePayDetail,
        stpAlertMessage,
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

      expect(wrapper.find({ testid: 'stp-alert-message-id' })).toHaveLength(0);
    });
  });

  describe('Render Delete button', () => {
    it('should not render delete button if isDeletable is false', () => {
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
