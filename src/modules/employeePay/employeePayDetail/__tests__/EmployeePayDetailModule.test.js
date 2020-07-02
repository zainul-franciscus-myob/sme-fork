import { mount } from 'enzyme';

import EmployeePayDetailModule from '../EmployeePayDetailModule';
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

  it('clear modal after sending the reversal of employee pay transaction successfully', () => {
    const { wrapper, module } = constructModule();

    module.sendReversalEmployeePay();
    wrapper.update();

    expect(wrapper).toEqual({});
    expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/payRun'));
  });
});
