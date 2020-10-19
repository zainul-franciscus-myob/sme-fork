import { mount } from 'enzyme';
import React from 'react';

import AmountInput from '../../../../../../../../components/autoFormatter/AmountInput/AmountInput';
import PayDetailsTableRow from '../PayDetailsTableRow';
import tableConfig from '../PayDetailsTableConfig';

describe('Employee pay details table', () => {
  const props = {
    employeeId: 21,
    employeeName: 'Mary Jones',
    tableConfig,
  };

  it('Renders with selectable amount input field', () => {
    const entry = { hours: 5 };

    const wrapper = mount(<PayDetailsTableRow {...props} entry={entry} />);

    const isSelectable = wrapper.find(AmountInput).find('input').props()
      .disabled;

    expect(isSelectable).toEqual(false);
  });

  describe('Renders with unselectable amount input field', () => {
    it('for payrollCategoryType KiwiSaverEmployers', () => {
      const entry = { hours: 5, payrollCategoryType: 'KiwiSaverEmployers' };

      const wrapper = mount(<PayDetailsTableRow {...props} entry={entry} />);

      const isSelectable = wrapper.find(AmountInput).find('input').props()
        .disabled;

      expect(isSelectable).toEqual(true);
    });

    it('for payrollCategoryType KiwiSaverEmployee', () => {
      const entry = { hours: 5, payrollCategoryType: 'KiwiSaverEmployee' };

      const wrapper = mount(<PayDetailsTableRow {...props} entry={entry} />);

      const isSelectable = wrapper.find(AmountInput).find('input').props()
        .disabled;

      expect(isSelectable).toEqual(true);
    });

    it('for payrollCategoryType HourlyWage', () => {
      const entry = { hours: 5, payrollCategoryType: 'HourlyWage' };

      const wrapper = mount(<PayDetailsTableRow {...props} entry={entry} />);

      const isSelectable = wrapper.find(AmountInput).find('input').props()
        .disabled;

      expect(isSelectable).toEqual(true);
    });

    it('with prop disableAmountInput', () => {
      const entry = { hours: 5 };

      const wrapper = mount(
        <PayDetailsTableRow {...props} entry={entry} disableAmountInput />
      );

      const isSelectable = wrapper.find(AmountInput).find('input').props()
        .disabled;

      expect(isSelectable).toEqual(true);
    });
  });
});
