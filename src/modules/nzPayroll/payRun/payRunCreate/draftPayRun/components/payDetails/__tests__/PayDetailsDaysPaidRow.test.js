import { mount } from 'enzyme';
import React from 'react';

import PayDetailsDaysPaidRow from '../PayDetailsDaysPaidRow';
import tableConfig from '../PayDetailsTableConfig';

describe('PayDetailsDaysPaidRow', () => {
  const props = {
    employeeId: 21,
    tableConfig,
    daysPaid: 7,
  };

  it('Should render with days paid property as displayed value', () => {
    const wrapper = mount(<PayDetailsDaysPaidRow {...props} />);
    const expected = '7';
    const inputValue = wrapper.find('input').prop('value');
    expect(inputValue).toEqual(expected);
  });
});
