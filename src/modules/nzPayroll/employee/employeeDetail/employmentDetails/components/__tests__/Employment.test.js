import { DatePicker, Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import Employment from '../Employment';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('<Employment />', () => {
  afterEach(jest.clearAllMocks);

  const props = {
    employmentDetails: employeeDetails.payrollDetails.employmentDetails,
    onEmploymentDetailsChange: jest.fn(),
    employmentStatusOptions: employeeDetails.employmentStatusOptions,
  };

  const wrapper = mount(<Employment {...props} />);

  describe('Employment Component', () => {
    describe('startDate', () => {
      const name = 'startDate';
      const field = wrapper.find({ name }).find(DatePicker);
      it('should render Start date DatePicker', () => {
        expect(field.exists()).toBeTruthy();
        expect(field.prop('label')).toEqual('Start date');
        expect(field.props()).toMatchObject({
          value: props.employmentDetails.startDate,
        });
      });

      it('should execute the onEmploymentDetailsChange callback', () => {
        field.props().onSelect({ target: { name, value: '' } });

        expect(props.onEmploymentDetailsChange).toHaveBeenCalledTimes(1);
      });
    });

    describe('terminationDate field', () => {
      const name = 'terminationDate';
      const field = wrapper.find({ name }).find(DatePicker);

      it('should render Termination date DatePicker', () => {
        expect(field.exists()).toBeTruthy();
        expect(field.prop('label')).toEqual('Termination date');
        expect(field.props()).toMatchObject({
          value: props.employmentDetails.terminationDate,
        });
      });

      it('should execute the onEmploymentDetailsChange callback', () => {
        field.props().onSelect({ target: { name, value: '' } });

        expect(props.onEmploymentDetailsChange).toHaveBeenCalledTimes(1);
      });
    });

    describe('employmentStatus field', () => {
      const name = 'employmentStatus';
      const field = wrapper.find({ name }).find(Select);

      it('should render Employment Status dropdown with props', () => {
        expect(field.exists()).toBeTruthy();
        expect(field.prop('label')).toEqual('Employment status');
        expect(field.props()).toMatchObject({
          value: props.employmentDetails.employmentStatus,
        });
      });

      it('should execute the onEmploymentDetailsChange callback', () => {
        field.props().onChange({ target: { name, value: 'Fulltime' } });

        expect(props.onEmploymentDetailsChange).toHaveBeenCalledWith({
          key: name,
          value: 'Fulltime',
        });
      });
    });
  });
});
