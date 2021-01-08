import { Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import KiwiSaver from '../KiwiSaver';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('<KiwiSaver />', () => {
  afterEach(jest.clearAllMocks);

  const props = {
    kiwiSaverDetails: employeeDetails.payrollDetails.kiwiSaver,
    onKiwiSaverDetailsChange: jest.fn(),
    handleOnBlurWithKey: jest.fn(),
    kiwiSaverOptions: {
      kiwiSaverStatusOptions: employeeDetails.kiwiSaverStatusOptions,
      employeeContributionRateOptions:
        employeeDetails.kiwiSaverEmployeeContributionOptions,
      esctRateOptions:
        employeeDetails.employerSuperannuationContributionTaxOptions,
    },
  };

  const wrapper = mount(<KiwiSaver {...props} />);

  describe('KiwiSaver Component', () => {
    describe('kiwiSaverStatus field', () => {
      const name = 'kiwiSaverStatus';
      const field = wrapper.find({ name }).find(Select);

      it('should render KiwiSaver status select', () => {
        expect(field.exists()).toBeTruthy();
        expect(field.prop('label')).toEqual('KiwiSaver status');
        expect(field.props()).toMatchObject({
          value: props.kiwiSaverDetails.kiwiSaverStatus,
        });
      });

      it('should execute the onKiwiSaverDetailsChange callback', () => {
        field.props().onChange({ target: { name, value: '1' } });

        expect(props.onKiwiSaverDetailsChange).toHaveBeenCalledWith({
          key: name,
          value: '1',
        });
      });
    });

    describe('employeeContributionRate field', () => {
      const name = 'employeeContributionRate';
      const field = wrapper.find({ name }).find(Select);

      it('should render Employee ContributionRate select', () => {
        expect(field.exists()).toBeTruthy();
        expect(field.prop('label')).toEqual('Employee contribution rate (%)');
        expect(field.props()).toMatchObject({
          value: props.kiwiSaverDetails.employeeContributionRate,
        });
      });

      it('should execute the onKiwiSaverDetailsChange callback', () => {
        field.props().onChange({ target: { name, value: '4.00' } });

        expect(props.onKiwiSaverDetailsChange).toHaveBeenCalledWith({
          key: name,
          value: '4.00',
        });
      });
    });

    describe('employerContributionRate field', () => {
      const name = 'employerContributionRate';
      const field = wrapper.find({ name }).find(`AmountInput`);

      it('should render Employer contribution rate input', () => {
        expect(field.exists()).toBeTruthy();
        expect(field.prop('label')).toEqual('Employer contribution rate (%)');
        expect(field.props()).toMatchObject({
          value: props.kiwiSaverDetails.employerContributionRate,
        });
      });

      it('should execute the onKiwiSaverDetailsChange callback', () => {
        field.props().onChange({ target: { name, value: '14.00' } });

        expect(props.onKiwiSaverDetailsChange).toHaveBeenCalledWith({
          key: name,
          value: '14.00',
        });
      });
    });

    describe('employerSuperannuationContributionTax field', () => {
      const name = 'employerSuperannuationContributionTax';
      const field = wrapper.find({ name }).find(Select);

      it('should render Employee ContributionRate select', () => {
        expect(field.exists()).toBeTruthy();
        expect(field.prop('requiredLabel')).toEqual(
          'Employer superannuation contribution tax rate is required'
        );
        expect(field.prop('label')).toEqual(
          'Employer superannuation contribution tax rate'
        );
        expect(field.props()).toMatchObject({
          value: props.kiwiSaverDetails.employerSuperannuationContributionTax,
        });
      });

      it('should execute the onKiwiSaverDetailsChange callback', () => {
        field.props().onChange({ target: { name, value: '1' } });

        expect(props.onKiwiSaverDetailsChange).toHaveBeenCalledWith({
          key: name,
          value: '1',
        });
      });
    });
  });
});
