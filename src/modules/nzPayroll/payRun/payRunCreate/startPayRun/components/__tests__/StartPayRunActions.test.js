import { Button } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import StartPayRunActions from '../StartPayRunActions';

describe('StartPayrunActions', () => {
  it('when button clicked it should execute callback', () => {
    const callback = jest.fn();
    const wrapper = mount(<StartPayRunActions onNextButtonClick={callback} />);

    const nextButton = wrapper.find({ testid: 'nextButton' }).find(Button);
    nextButton.props().onClick();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
