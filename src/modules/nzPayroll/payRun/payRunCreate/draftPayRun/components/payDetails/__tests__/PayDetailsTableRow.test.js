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
    it('for type KiwiSaverEmployers', () => {
      const entry = { hours: 5, type: 'KiwiSaverEmployers' };

      const wrapper = mount(<PayDetailsTableRow {...props} entry={entry} />);

      const isSelectable = wrapper.find(AmountInput).find('input').props()
        .disabled;

      expect(isSelectable).toEqual(true);
    });

    it('for type KiwiSaverEmployee', () => {
      const entry = { hours: 5, type: 'KiwiSaverEmployee' };

      const wrapper = mount(<PayDetailsTableRow {...props} entry={entry} />);

      const isSelectable = wrapper.find(AmountInput).find('input').props()
        .disabled;

      expect(isSelectable).toEqual(true);
    });

    it('for type HourlyWage', () => {
      const entry = { hours: 5, type: 'HourlyWage' };

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
