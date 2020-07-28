import { mount } from 'enzyme/build';

import StpRegistrationAlertModalModule from '../StpRegistrationAlertModalModule';

describe('StpRegistrationAlertModalModuleTest', () => {
  it('should call function when continue button is clicked', () => {
    const someFunction = jest.fn();
    const module = new StpRegistrationAlertModalModule({
      onContinue: someFunction,
    });
    module.run({});

    const wrapper = mount(module.getView());
    wrapper.find('Button').simulate('click');

    expect(someFunction).toHaveBeenCalledTimes(1);
  });
});
