import { mount } from 'enzyme';
import React from 'react';

import { findComponentWithTestId } from '../../../../../../../common/tests/selectors';
import TaxTableCalculationForm from '../TaxTableCalculationForm';

describe('TaxTableCalculationForm', () => {
  describe('Withholding variation', () => {
    it('renders the withholding variation rate field when withholding variation is checked', () => {
      const props = {
        isWithholdingVariation: true,
        residencyStatusOptions: [],
        seniorTaxOffsetOptions: [],
        medicareLevyOptions: [],
      };
      const form = mount(<TaxTableCalculationForm {...props} />);

      const variationField = findComponentWithTestId(
        form,
        'withholdingVariation',
        'AmountInput'
      );

      expect(variationField).toHaveLength(1);
    });

    it('does not render the withholding variation rate field when withholding variation is not checked', () => {
      const props = {
        isWithholdingVariation: false,
        residencyStatusOptions: [],
        seniorTaxOffsetOptions: [],
        medicareLevyOptions: [],
      };
      const form = mount(<TaxTableCalculationForm {...props} />);

      const variationField = findComponentWithTestId(
        form,
        'withholdingVariation',
        'AmountInput'
      );

      expect(variationField).toHaveLength(0);
    });
  });
});
