import { mount } from 'enzyme';
import React from 'react';

import TaxDeclaration from '../TaxDeclaration';

describe('TaxDeclaration', () => {
  const props = {
    onInputChange: jest.fn(),

    tax: { irdNumber: '999 888 777', taxCode: 'ND' },

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

    it('should call onInputChange handler with key and value', () => {
      const target = { name: 'irdNumber', value: '5' };

      field.props().onChange({ target });

      expect(props.onInputChange).toHaveBeenCalledWith({ target });
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

    it('should call onInputChange handler', () => {
      field.props().onChange();

      expect(props.onInputChange).toHaveBeenCalled();
    });
  });
});
