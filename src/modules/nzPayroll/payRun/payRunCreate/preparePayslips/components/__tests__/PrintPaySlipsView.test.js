import { PageState, Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { printPaySlipEmployees } from '../../../../mappings/data/payRun/recordPayments';
import PrintPaySlipsView from '../PrintPaySlipsView';

describe('PrintPaySlipsView', () => {
  let wrapper;

  const setup = (props) => mount(<PrintPaySlipsView {...props} />);

  describe('Table View with employee', () => {
    const props = {
      employees: printPaySlipEmployees,
    };

    beforeEach(() => {
      wrapper = setup(props);
    });

    describe('Table View Header', () => {
      it('should display Employee table header', () => {
        const employeeHeaderItem = wrapper
          .find({ columnName: 'Employee' })
          .find(Table.HeaderItem);

        expect(employeeHeaderItem.exists()).toBe(true);
      });

      it('should display Take home pay table header', () => {
        const employeeHeaderItem = wrapper
          .find({ columnName: 'Take home pay ($)' })
          .find(Table.HeaderItem);

        expect(employeeHeaderItem.exists()).toBe(true);
      });
    });

    describe('Table View Row', () => {
      it('should display Employee Row', () => {
        const employeeName = wrapper
          .find(Table.RowItem)
          .find({ title: 'Fin Adventureland' })
          .text();
        const employeePay = wrapper
          .find(Table.RowItem)
          .find({ title: '61.77' })
          .text();

        expect(wrapper.find(Table.RowItem)).toHaveLength(6);
        expect(employeeName).toEqual('Fin Adventureland');
        expect(employeePay).toEqual('61.77');
      });
    });
  });

  describe('Table View without employee', () => {
    const props = {
      employees: [],
    };

    beforeEach(() => {
      wrapper = setup(props);
    });

    describe('Table View Row', () => {
      wrapper = mount(<PrintPaySlipsView {...props} />);
      it('should display no results', () => {
        const noResultFoundField = wrapper
          .find(PageState)
          .find({ title: 'No results found' });

        expect(wrapper.find(Table.RowItem)).toHaveLength(0);
        expect(noResultFoundField.exists()).toBe(true);
      });
    });
  });
});
