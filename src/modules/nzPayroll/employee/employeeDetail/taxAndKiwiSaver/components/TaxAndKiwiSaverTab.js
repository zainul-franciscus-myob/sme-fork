import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxAndKiwiSaver, getTaxCodeOptions } from '../TaxAndKiwiSaverSelectors';
import EmployerSCTR from './EmployerSCTR';
import KiwiSaver from './KiwiSaver';
import TaxDeclaration from './TaxDeclaration';

const TaxAndKiwiSaverTab = ({ taxCodeOptions, taxAndKiwiSaver, onTaxAndKiwiSaverChange }) => {
  const onInputChange = event => onTaxAndKiwiSaverChange({
    key: event.target.name,
    value: event.target.value,
  });

  return (
  <FormHorizontal layout="primary">
    <TaxDeclaration
      taxCodeOptions={taxCodeOptions}
      taxAndKiwiSaver={taxAndKiwiSaver}
      onInputChange={onInputChange}
    />
    <KiwiSaver />
    <EmployerSCTR />
  </FormHorizontal>
  );
};

const mapStateToProps = (state) => ({
  taxCodeOptions: getTaxCodeOptions(state),
  taxAndKiwiSaver: getTaxAndKiwiSaver(state),
});

export default connect(mapStateToProps)(TaxAndKiwiSaverTab);
