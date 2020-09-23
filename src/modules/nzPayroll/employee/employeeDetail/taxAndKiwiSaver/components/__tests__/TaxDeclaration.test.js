import { mount } from 'enzyme';
import React from 'react';

import TaxDeclaration from '../TaxDeclaration';

describe('TaxDeclaration', () => {
  const props = {
    onTaxInputChange: jest.fn(),

    onTaxCodeChange: jest.fn(),

    onTaxInputBlur: jest.fn(),

    tax: { irdNumber: '999 888 77', taxCode: 'ND' },

    taxCodeOptions: [
      { key: 'M', value: 'M' },
      { key: 'ME', value: 'ME' },
    ],
  };

  afterEach(jest.clearAllMocks);

  describe('IRD number - Input field', () => {
    const wrapper = mount(<TaxDeclaration {...props} />);
    const field = wrapper.find({ name: 'irdNumber' }).find('Input');

    it('should render input field with given props', () => {
      expect(field.props()).toMatchObject({
        value: props.tax.irdNumber,
        label: 'IRD number',
      });
    });

    it('should call onTaxInputChange handler with value', () => {
      const target = { name: 'irdNumber', value: '5' };

      field.props().onChange({ target });

      expect(props.onTaxInputChange).toHaveBeenCalled();
    });

    it('should call onTaxInputBlur handler with value', () => {
      const target = { name: 'irdNumber', value: '5' };

      field.props().onBlur({ target });

      expect(props.onTaxInputBlur).toHaveBeenCalled();
    });

    it('should be disabled when taxCode is ND', () => {
      expect(field.prop('disabled')).toBe(true);
    });
  });

  describe('Tax code - Select Input field', () => {
    const wrapper = mount(<TaxDeclaration {...props} />);
    const field = wrapper.find({ name: 'taxCode' }).find('Select');

    it('should render Select field with given props', () => {
      expect(field.props()).toMatchObject({
        value: props.tax.taxCode,
        label: 'Tax code',
      });
    });

    it('should call onTaxCodeChange handler', () => {
      const target = { name: 'taxCode', value: 'M' };
      field.props().onChange({ target });

      expect(props.onTaxCodeChange).toHaveBeenCalled();
    });
  });
});
