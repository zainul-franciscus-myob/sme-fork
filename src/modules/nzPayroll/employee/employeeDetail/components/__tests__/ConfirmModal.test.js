
import { mount } from 'enzyme';
import React from 'react';

import ConfirmModal from '../ConfirmModal';

const props = {
  modal: { type: '' },
  confirmModalListeners: jest.fn(),
};

describe('ConfirmModal', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<ConfirmModal {...props} />);
  });

  it('does returns UnsavedModal when type is not provided', () => {
    expect(wrapper.find('UnsavedModal').exists()).toBe(true);
    expect(wrapper.find('DeleteModal').exists()).toBe(false);
  });

  it('does returns Delete when modal type is DELETE', () => {
    wrapper.setProps({ modal: { type: 'DELETE' } });

    expect(wrapper.find('UnsavedModal').exists()).toBe(false);
    expect(wrapper.find('DeleteModal').exists()).toBe(true);
  });
});
