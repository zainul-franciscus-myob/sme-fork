import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeOptions, getTaxDetails } from '../TaxAndKiwiSaverSelectors';
import EmployerSCTR from './EmployerSCTR';
import KiwiSaver from './KiwiSaver';
import TaxDeclaration from './TaxDeclaration';

const TaxAndKiwiSaverTab = ({ taxCodeOptions, tax, onTaxChange }) => {
  const onInputChange = (event) =>
    onTaxChange({
      key: event.target.name,
      value: event.target.value,
    });

  return (
    <FormHorizontal layout="primary">
      <TaxDeclaration
        taxCodeOptions={taxCodeOptions}
        tax={tax}
        onInputChange={onInputChange}
      />
      <KiwiSaver />
      <EmployerSCTR />
    </FormHorizontal>
  );
};

const mapStateToProps = (state) => ({
  taxCodeOptions: getTaxCodeOptions(state),
  tax: getTaxDetails(state),
});

export default connect(mapStateToProps)(TaxAndKiwiSaverTab);
