import { mount } from 'enzyme';
import React from 'react';

import * as TaxTableCalculationModalEnabled
  from '../../../../../../../common/featureToggles/TaxTableCalculationModalEnabled';
import TaxDetails from '../TaxDetails';

describe('TaxDetails', () => {
  const constructView = () => (
    mount(
      <TaxDetails
        taxTablesOptions={[]}
        selectedTaxTable={{}}
        taxDetails={{
          // extraTax,
          // taxFileNumber,
          // totalRebates,
          // withholdingVariationRate,
        }}
        onPayrollTaxDetailsChange={() => {}}
        taxFileNumberStatusOptions={[]}
        // taxFileNumberStatus
        onTaxFileNumberStatusChange={() => {}}
      />,
    )
  );

  describe('REACT_APP_FEATURE_TAX_TABLE_CALC_MODAL', () => {
    it('renders the tax table calculation modal link when feature toggle is on', () => {
      TaxTableCalculationModalEnabled.default = true;
      const taxDetails = constructView();

      const taxTableCalculationLinkField = taxDetails.findWhere(c => c.prop('testid') === 'taxTableCalculationLinkField');

      expect(taxTableCalculationLinkField).toHaveLength(1);
    });

    it('does not render the tax table calculation modal link when feature toggle is off', () => {
      TaxTableCalculationModalEnabled.default = false;
      const taxDetails = constructView();

      const taxTableCalculationLinkField = taxDetails.findWhere(c => c.prop('testid') === 'taxTableCalculationLinkField');

      expect(taxTableCalculationLinkField).toHaveLength(0);
    });
  });
});
