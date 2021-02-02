import { Card } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import EiSubmissionsFilter from '../EiSubmissionsFilter';

describe('EiSubmissionsFilter', () => {
  const props = {
    onPayrollYearChange: jest.fn(),
    onRefreshClick: jest.fn(),
    payrollYears: [
      {
        label: '2020/21',
        year: '2021',
        startDate: '2020-04-01',
        endDate: '2021-03-31',
      },
    ],
    selectedPayrollYear: '2021',
  };

  afterEach(jest.clearAllMocks);

  describe('On render', () => {
    it('should have all expected components', () => {
      const wrapper = mount(<EiSubmissionsFilter {...props} />);
      expect(wrapper.exists(Card)).toEqual(true);
    });
  });

  describe('Payroll year options', () => {
    it('Changing the payroll year should call the expected handler', () => {
      const wrapper = mount(<EiSubmissionsFilter {...props} />);
      wrapper.find('select').simulate('change', { target: { value: '2019' } });

      expect(props.onPayrollYearChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Refresh button', () => {
    it(`Clicking the refresh button should call expected handler`, () => {
      // Arrange
      const wrapper = mount(<EiSubmissionsFilter {...props} />);
      const button = findButtonWithTestId(wrapper, 'refreshButton');

      // Act
      button.simulate('click');

      // Assert
      expect(props.onRefreshClick).toHaveBeenCalledTimes(1);
    });
  });
});
