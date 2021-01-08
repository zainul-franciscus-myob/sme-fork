import { Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import TaxDeclaration from '../TaxDeclaration';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('<TaxDeclaration />', () => {
  afterEach(jest.clearAllMocks);

  const props = {
    taxDetails: employeeDetails.payrollDetails.tax,
    taxCodeOptions: employeeDetails.taxCodeOptions,
    onTaxDetailsChange: jest.fn(),
    handleOnBlurWithKey: jest.fn(),
  };

  const wrapper = mount(<TaxDeclaration {...props} />);

  describe('TaxDeclaration Component', () => {
    it('should render TaxDeclaration input', () => {
      const field = wrapper.find({ name: 'irdNumber' }).find('TfnInput');

      expect(field.exists()).toBeTruthy();
      expect(field.prop('label')).toEqual('IRD number');
      expect(field.prop('requiredLabel')).toEqual('IRD number is required');
      expect(field.props()).toMatchObject({
        value: props.taxDetails.irdNumber,
      });
    });

    it('should render TaxDeclaration status select', () => {
      const field = wrapper.find({ name: 'taxCode' }).find(Select);

      expect(field.exists()).toBeTruthy();
      expect(field.prop('label')).toEqual('Tax code');
      expect(field.prop('requiredLabel')).toEqual('Tax code is required');
      expect(field.props()).toMatchObject({
        value: props.taxDetails.taxCode,
      });
    });
  });
});
