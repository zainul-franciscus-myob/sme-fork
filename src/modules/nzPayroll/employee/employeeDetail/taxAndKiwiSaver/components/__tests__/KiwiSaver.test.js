import { mount } from 'enzyme';
import React from 'react';

import KiwiSaver from '../KiwiSaver';

describe('KiwiSaver', () => {
  const props = {
    kiwiSaver: {
      kiwiSaverStatus: 1,
      employeeContributionRate: 2,
      employerContributionRate: 3,
    },
    kiwiSaverStatusOptions: [{ key: 1, value: 'Active member' }],
    employeeContributionOptions: [{ key: '3', value: 3 }],
    onKiwiSaverInputChange: jest.fn(),
    onEmployerContributionRateBlur: jest.fn(),
  };
  afterEach(jest.clearAllMocks);
  describe('KiwiSaver - Select Input field', () => {
    const wrapper = mount(<KiwiSaver {...props} />);

    const kiwiSaverStatusSelect = wrapper
      .find({ name: 'kiwiSaverStatus' })
      .find('Select');

    it('should render kiwiSaverStatusSelect field with given props', () => {
      expect(kiwiSaverStatusSelect.props()).toMatchObject({
        value: props.kiwiSaver.kiwiSaverStatus,
        label: 'KiwiSaver status',
      });
    });

    it('should call onKiwiSaverInputChange handler with key and value for kiwiSaverStatus', () => {
      const target = { name: 'kiwiSaverStatus', value: '1' };
      const expected = { key: 'kiwiSaverStatus', value: '1' };

      kiwiSaverStatusSelect.props().onChange({ target });

      expect(props.onKiwiSaverInputChange).toHaveBeenCalledWith(expected);
    });

    const employeeContributionRateSelect = wrapper
      .find({ name: 'employeeContributionRate' })
      .find('Select');

    it('should render employeeContributionRateSelect select with given props', () => {
      expect(employeeContributionRateSelect.props()).toMatchObject({
        value: props.kiwiSaver.employeeContributionRate,
        label: 'Employee contribution rate (%)',
      });
    });

    it('should call onKiwiSaverInputChange handler with key and value for employeeContributionRate', () => {
      const target = { name: 'employeeContributionRate', value: '2' };
      const expected = { key: 'employeeContributionRate', value: '2' };

      employeeContributionRateSelect.props().onChange({ target });

      expect(props.onKiwiSaverInputChange).toHaveBeenCalledWith(expected);
    });

    const employerContributionRateInput = wrapper
      .find({ name: 'employerContributionRate' })
      .find('AmountInput');

    it('should render employerContributionRateInput input with given props', () => {
      expect(employerContributionRateInput.props()).toMatchObject({
        value: props.kiwiSaver.employerContributionRate,
        label: 'Employer contribution rate (%)',
      });
    });

    it('should call onKiwiSaverInputChange handler with key and value for employerContributionRate', () => {
      const target = { name: 'employerContributionRate', value: '3' };
      const expected = { key: 'employerContributionRate', value: '3' };

      employerContributionRateInput.props().onChange({ target });

      expect(props.onKiwiSaverInputChange).toHaveBeenCalledWith(expected);
    });

    it('should call onKiwiSaverEmployerContributionRateBlur handler on blur with key and value for employerContributionRate', () => {
      const target = { name: 'employerContributionRate', value: '3' };
      const expected = { key: 'employerContributionRate', value: '3' };

      employerContributionRateInput.props().onBlur({ target });

      expect(props.onEmployerContributionRateBlur).toHaveBeenCalledWith(
        expected
      );
    });
  });
});
