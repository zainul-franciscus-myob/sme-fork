import { mount } from 'enzyme';

import { SET_MODAL_IS_OPEN } from '../EmployeePayModalIntents';
import EmployeePayModalModule from '../EmployeePayModalModule';
import loadEmployeePayReversalPreviewDetail from '../../mappings/data/loadEmployeePayReversalPreviewDetail';

describe('employeePayModalModule', () => {
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
      },
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

  it('renders reversal info message when response is reversal', () => {
    const { wrapper, module } = constructModule();
    module.loadEmployeePayReversalPreviewDetail();
    wrapper.update();

    const header = wrapper.find({ testid: 'reversalInfoMsg' });

    expect(header).toHaveLength(1);
  });
});
