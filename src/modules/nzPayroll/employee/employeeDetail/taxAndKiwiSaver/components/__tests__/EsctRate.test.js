import { mount } from 'enzyme';
import React from 'react';

import EsctRate from '../EsctRate';

describe('Employer Superannuation Contribution Tax Rate', () => {
  const props = {
    esctRate: '0',
    esctOptions: [
      {
        displayName: 'Please select an option',
        value: '0',
      },
      {
        displayName: 'Up to $16,800 (tax at 10.5%)',
        value: '0.105',
      },
      {
        displayName: '$16,801 to $57,600 (tax at 17.5%)',
        value: '0.175',
      },
      {
        displayName: '$57,601 to $84,000 (tax at 30%)',
        value: '0.3',
      },
      {
        displayName: 'Over $84,000 (tax at 33%)',
        value: '0.33',
      },
    ],
    onEsctRateChange: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('Employee annual earnings - Select Input field', () => {
    const wrapper = mount(<EsctRate {...props} />);

    const employeeAnnualEarningsSelector = wrapper
      .find({ name: 'employerSuperannuationContributionTax' })
      .find('Select');

    it('should render employeeAnnualEarningsSelector field with given props', () => {
      expect(employeeAnnualEarningsSelector.props()).toMatchObject({
        value: props.esctRate,
        label: 'Employee annual earnings',
      });
    });

    it('should call employeeAnnualEarningsSelector handler with key and value for kiwiSaverStatus', () => {
      const target = {
        name: 'employerSuperannuationContributionTax',
        value: '1',
      };
      const expected = {
        key: 'employerSuperannuationContributionTax',
        value: '1',
      };

      employeeAnnualEarningsSelector.props().onChange({ target });

      expect(props.onEsctRateChange).toHaveBeenCalledWith(expected);
    });
  });
});
