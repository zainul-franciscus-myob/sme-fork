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
        },
        setRootView,
      },
    );
    module.run({});

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
});
