import { mount } from 'enzyme';
import React from 'react';

import { findComponentWithTestId } from '../../../../../common/tests/selectors';
import JobMakerActionTypes from '../JobMakerActionTypes';
import JobMakerTable from '../components/JobMakerTable';

describe('JobMakerTable', () => {
  let employees;
  let currentPeriodDetails;
  let wrapper;
  const onDropdownItemClicked = jest.fn();
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
      {
        employeeId: '004',
        firstName: 'lastname',
        lastName: ' firstname',
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
        onDropdownItemClicked={onDropdownItemClicked}
      />
    );
  });

  it('should not render popover when first render the page', () => {
    // assert
    expect(wrapper.find({ testid: 'Popover' }).exists()).toBe(false);
  });

  it('should render popover when nomination row button is clicked ', () => {
    const queryButton = `nomination-button-${employees[0].employeeId}`;
    const button = findComponentWithTestId(wrapper, queryButton, 'a');
    button.simulate('click');
    // assert
    expect(wrapper.find({ testid: 'Popover' }).exists()).toBe(true);
  });

  it('should not find popover link button when no nomination returned', () => {
    expect(
      findComponentWithTestId(wrapper, 'nomination-button-003', 'a').exists()
    ).toBe(false);
    expect(
      findComponentWithTestId(wrapper, 'nomination-button-004', 'a').exists()
    ).toBe(false);
  });

  describe('dropdown items', () => {
    it('should load dropdown items correctly', () => {
      const { employeeId } = employees[0];
      const dropdown = wrapper
        .find({ testid: `dropdownlist-${employeeId}` })
        .first();

      expect(dropdown.exists()).toBe(true);
    });

    it('should enable items and actions correctly', () => {
      const { employeeId } = employees[0];
      const expectedEnabledActions = [
        JobMakerActionTypes.Nominate,
        JobMakerActionTypes.CancelNominate,
        JobMakerActionTypes.CancelClaim,
        JobMakerActionTypes.Claim,
        JobMakerActionTypes.UpdateEmployee,
      ];

      const enabledAction = wrapper
        .find({ testid: `dropdownlist-${employeeId}` })
        .first()
        .prop('items')
        .map((i) => i.props)
        .filter((p) => !p.disabled)
        .map((i) => i.value);

      expect(enabledAction.sort()).toEqual(expectedEnabledActions.sort());
    });

    it('should call onclicked with right action and employeeId', () => {
      const employee = employees[0];
      const dropdown = wrapper
        .find({ testid: `dropdownlist-${employee.employeeId}` })
        .first();

      dropdown.prop('onSelect')(JobMakerActionTypes.Nominate);

      expect(onDropdownItemClicked).toHaveBeenCalledWith(
        employee,
        JobMakerActionTypes.Nominate
      );
    });
  });
});
