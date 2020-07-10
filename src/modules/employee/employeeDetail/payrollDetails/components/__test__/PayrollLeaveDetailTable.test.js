import { mount } from 'enzyme';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import PayrollLeaveDetailTable from '../PayrollLeaveDetailTable';

const nonCarryOvers = [
  {
    payItemId: 1,
    carryLeaveOverToNextYear: false,
  },
  {
    payItemId: 2,
    carryLeaveOverToNextYear: null,
  },
  {
    payItemId: 3,
    carryLeaveOverToNextYear: undefined,
  },
];

describe('PayrollLeaveDetailTable', () => {
  it('should not show input field for balanceAdjustment when carryLeaveOverToNextYear is falsy', () => {
    const wrapper = mount(
      <PayrollLeaveDetailTable
        selected={nonCarryOvers}
      ></PayrollLeaveDetailTable>
    );
    const balanceAdjustmentInput = wrapper.findWhere(
      (n) => n.type() === AmountInput && n.prop('name') === 'balanceAdjustment'
    );

    expect(balanceAdjustmentInput.length).toBe(0);
  });

  it('should show input field for balanceAdjustment when carryLeaveOverToNextYear is true', () => {
    const wrapper = mount(
      <PayrollLeaveDetailTable
        selected={[{ payItemId: 1, carryLeaveOverToNextYear: true }]}
      ></PayrollLeaveDetailTable>
    );
    const balanceAdjustmentInput = wrapper.findWhere(
      (n) => n.type() === AmountInput && n.prop('name') === 'balanceAdjustment'
    );

    expect(balanceAdjustmentInput.length).toBe(1);
  });
});
