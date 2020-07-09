import { Modal } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { findButtonWithTestId } from '../../../../common/tests/selectors';
import EmployeePayDetailModule from '../EmployeePayDetailModule';
import StpDeclarationModal from '../../../stp/stpDeclarationModal/components/StpDeclarationModal';
import loadEmployeePayReversalPreviewDetail from '../../mappings/data/loadEmployeePayReversalPreviewDetail';

describe('employeePayModalModule', () => {
  const constructModule = () => {
    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const module = new EmployeePayDetailModule(
      {
        integration: {
          read: ({ onSuccess }) => {
            onSuccess(loadEmployeePayReversalPreviewDetail);
          },
          write: ({ onSuccess }) => onSuccess(),
        },
        setRootView,
      },
    );
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
    expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/payRun'));
  });

  describe('Stp Declaration Modal', () => {
    it('should open stp declaration modal when Record button is pressed', () => {
      const { wrapper, module } = constructModule();
      module.loadEmployeePayReversalPreviewDetail();
      wrapper.update();

      findButtonWithTestId(wrapper, 'view-record-reverse-btn').simulate('click');
      wrapper.update();

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(1);
      expect(module.stpDeclarationModule.onDeclared).toBe(module.sendReversalEmployeePay);
    });

    it('should not open stp declaration modal when Cancel button is pressed', () => {
      const { wrapper, module } = constructModule();
      module.loadEmployeePayReversalPreviewDetail();
      wrapper.update();

      findButtonWithTestId(wrapper, 'view-record-reverse-back-btn').simulate('click');
      wrapper.update();

      const declarationModal = wrapper.find(StpDeclarationModal);
      expect(declarationModal.find(Modal)).toHaveLength(0);
    });
  });
});
