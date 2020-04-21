import { mount } from 'enzyme';

import JobKeeperModule from '../JobKeeperModule';

describe('jobKeeperModule', () => {
  const constructModule = () => {
    const setAlertMock = jest.fn();
    const module = new JobKeeperModule({
      integration: {
        read: ({ onSuccess }) => onSuccess({}),
      },
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

  it('renders header', () => {
    const { wrapper } = constructModule();

    const header = wrapper.find({ testid: 'jobKeeperPaymentHeader' });

    expect(header).toHaveLength(1);
  });
});
