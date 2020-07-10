import { mount } from 'enzyme';
import React from 'react';

import AmountInput from '../../../../../../../../components/autoFormatter/AmountInput/AmountInput';
import PayDetailsTableRow from '../PayDetailsTableRow';
import tableConfig from '../PayDetailsTableConfig';

describe('Employee pay details table', () => {
  const entry = { hours: 5, type: 'KiwiSaver' };

  const props = {
    employeeId: 21,
    employeeName: 'Mary Jones',
    tableConfig,
    entry,
  };

  it('Should render with unselectable amount input field', () => {
    const wrapper = mount(<PayDetailsTableRow {...props} />);

    const isSelectable = wrapper.find(AmountInput).find('input').props().disabled;

    expect(isSelectable).toEqual(true);
  });
});
