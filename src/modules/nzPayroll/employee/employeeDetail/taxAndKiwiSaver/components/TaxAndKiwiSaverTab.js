import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsIrdNumberEditable,
  getTaxCodeOptions,
  getTaxDetails,
} from '../TaxAndKiwiSaverSelectors';
import EmployerSCTR from './EmployerSCTR';
import KiwiSaver from './KiwiSaver';
import TaxDeclaration from './TaxDeclaration';

const TaxAndKiwiSaverTab = ({
  taxCodeOptions,
  tax,
  isIrdNumberEditable,
  onTaxChange,
  onTaxCodeChange,
}) => {
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
        isIrdNumberEditable={isIrdNumberEditable}
        onInputChange={onInputChange}
        onTaxCodeChange={onTaxCodeChange}
      />
      <KiwiSaver />
      <EmployerSCTR />
    </FormHorizontal>
  );
};

const mapStateToProps = (state) => ({
  taxCodeOptions: getTaxCodeOptions(state),
  tax: getTaxDetails(state),
  isIrdNumberEditable: getIsIrdNumberEditable(state),
});

export default connect(mapStateToProps)(TaxAndKiwiSaverTab);
