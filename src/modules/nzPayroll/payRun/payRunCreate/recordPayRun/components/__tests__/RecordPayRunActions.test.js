import { mount } from 'enzyme';
import React from 'react';

import RecordPayRunActions from '../RecordPayRunActions';

describe('RecordPayRunActions', () => {
  it('when button clicked it should execute callback', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <RecordPayRunActions onRecordButtonClick={callback} />
    );

    const nextButton = wrapper.find({ testid: 'saveButton' }).find('Button');
    nextButton.props().onClick();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
