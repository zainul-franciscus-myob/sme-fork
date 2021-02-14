import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import JobMakerTable from '../components/JobMakerTable';

describe('JobMakerTable', () => {
  let employees;
  let currentPeriodDetails;
  let wrapper;
  // setup
  beforeEach(() => {
    // arrange
    employees = [
      {
        employeeId: '001',
        firstName: 'lastname',
        lastName: ' firstname',
        nomination: 'nomination',
        declaration: 'declaration',
      },
      {
        employeeId: '002',
        firstName: 'lastname',
        lastName: ' firstname',
        nomination: 'nomination',
        declaration: 'declaration',
      },
      {
        employeeId: '003',
        firstName: 'lastname',
        lastName: ' firstname',
        nomination: null,
        declaration: 'declaration',
      },
    ];
    currentPeriodDetails = {
      period: 1,
      periodEnd: 'sample2',
      periodStart: 'sample1',
    };
    // act
    wrapper = mount(
      <JobMakerTable
        employees={employees}
        currentPeriodDetails={currentPeriodDetails}
      />
    );
  });

  it('should not render popover when first render the page', () => {
    // assert
    expect(wrapper.find({ testid: 'Popover' }).exists()).toBe(false);
  });

  it('should render popover when nomination row button is clicked ', () => {
    const queryButton = `nomination-button-${employees[0].employeeId}`;
    const button = findButtonWithTestId(wrapper, queryButton);
    button.simulate('click');
    // assert
    expect(wrapper.find({ testid: 'Popover' }).exists()).toBe(true);
  });

  it('should not find popover link button when no nomination returned', () => {
    expect(
      findButtonWithTestId(wrapper, 'nomination-button-003').exists()
    ).toBe(false);
  });
});
