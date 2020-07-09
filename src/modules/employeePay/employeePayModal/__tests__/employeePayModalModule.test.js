import { Modal } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { SET_MODAL_IS_OPEN } from '../EmployeePayModalIntents';
import { findButtonWithTestId } from '../../../../common/tests/selectors';
import EmployeePayModalModule from '../EmployeePayModalModule';
import StpDeclarationModal from '../../../stp/stpDeclarationModal/components/StpDeclarationModal';
import loadEmployeePayReversalPreviewDetail
  from '../../mappings/data/loadEmployeePayReversalPreviewDetail';

describe('employeePayModalModule', () => {
  describe('employeePayModalModule without feature toggles', () => {
    const constructModule = (module = new EmployeePayModalModule(
      {
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
      },
    )) => {
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

    it('renders delete button if readonly state is false', () => {
      const { wrapper, module } = constructModule();
      module.openModal({
        transactionId: '01',
        businessId: '0000-1111-2222-3333',
        employeeName: 'Batman',
        region: 'au',
        readonly: false,
      });
      wrapper.update();

      expect(wrapper.find({ testid: 'employee-pay-modal-delete-btn' })).toHaveLength(1);
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

      expect((findButtonWithTestId(wrapper, 'employee-pay-modal-delete-btn'))).toHaveLength(0);
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

      expect(wrapper.find({ testid: 'employee-pay-modal-delete-btn' })).toHaveLength(1);
      expect(findButtonWithTestId(wrapper, 'modal-preview-reverse-btn')).toHaveLength(0);
    });

    it('clear modal after sending the reversal of employee pay transaction successfully', () => {
      const { wrapper, module } = constructModule();

      module.sendReversalEmployeePay();
      wrapper.update();

      expect(wrapper).toEqual({});
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/payRun'));
    });
  });

  describe('construct module with Feature toggles', () => {
    const constructModuleWithFT = (module = new EmployeePayModalModule(
      {
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
      },
    )) => {
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

      expect((findButtonWithTestId(wrapper, 'modal-preview-reverse-btn'))).toHaveLength(1);
    });
  });

  describe('Stp Declaration Modal', () => {
    const constructModuleWithModal = (module = new EmployeePayModalModule(
      {
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
      },
    )) => {
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

      findButtonWithTestId(wrapper, 'modal-preview-reverse-btn').simulate('click');
      findButtonWithTestId(wrapper, 'modal-record-reverse-btn').simulate('click');

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(1);
      expect(module.stpDeclarationModule.onDeclared).toBe(
        module.sendReversalEmployeePay,
      );
    });
  });
});
