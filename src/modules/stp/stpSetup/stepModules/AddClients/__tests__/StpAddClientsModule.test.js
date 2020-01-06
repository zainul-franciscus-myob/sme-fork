import { Alert } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import StpAddClientsModule from '../StpAddClientsModule';

const findComponentWithTestId = (wrapper, testId, componentName) => wrapper.findWhere(c => (
  c.prop('testid') === testId && c.name() === componentName
));

const findButtonWithTestId = (wrapper, testId) => findComponentWithTestId(wrapper, testId, 'Button');

describe('StpAddClientsModule', () => {
  const constructModule = ({
    onFinish = jest.fn(),
    onPrevious = jest.fn(),
  }) => {
    const module = new StpAddClientsModule({
      onFinish,
      onPrevious,
    });

    const wrapper = mount(module.getView());

    return {
      module,
      wrapper,
    };
  };

  describe('nextButton', () => {
    it('calls passed onFinish function', () => {
      const onFinish = jest.fn();
      const { wrapper } = constructModule({
        onFinish,
      });

      const nextButton = findButtonWithTestId(wrapper, 'nextButton');
      nextButton.simulate('click');

      expect(onFinish).toHaveBeenCalled();
    });
  });

  describe('previousButton', () => {
    it('calls passed onPrevious function', () => {
      const onPrevious = jest.fn();
      const { wrapper } = constructModule({
        onPrevious,
      });

      const nextButton = findButtonWithTestId(wrapper, 'previousButton');
      nextButton.simulate('click');

      expect(onPrevious).toHaveBeenCalled();
    });
  });

  it('renders an info alert', () => {
    const { wrapper } = constructModule({});

    const alert = wrapper.find(Alert);

    expect(alert).toHaveLength(1);
    expect(alert.prop('type')).toEqual('info');
  });
});
