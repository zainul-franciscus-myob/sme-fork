import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployeeContributionOptions,
  getIsIrdNumberEditable,
  getKiwiSaver,
  getKiwiSaverStatusOptions,
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
  kiwiSaver,
  onKiwiSaverChange,
  employeeContributionOptions,
  kiwiSaverStatusOptions,
}) => {
  const onTaxInputChange = (event) =>
    onTaxChange({
      key: event.target.name,
      value: event.target.value,
    });

  const onKiwiSaverInputChange = (event) =>
    onKiwiSaverChange({
      key: event.target.name,
      value: event.target.value,
    });

  return (
    <FormHorizontal layout="primary">
      <TaxDeclaration
        taxCodeOptions={taxCodeOptions}
        tax={tax}
        isIrdNumberEditable={isIrdNumberEditable}
        onTaxInputChange={onTaxInputChange}
        onTaxCodeChange={onTaxCodeChange}
      />
      <KiwiSaver
        kiwiSaver={kiwiSaver}
        kiwiSaverStatusOptions={kiwiSaverStatusOptions}
        employeeContributionOptions={employeeContributionOptions}
        onKiwiSaverInputChange={onKiwiSaverInputChange}
      />
      <EmployerSCTR />
    </FormHorizontal>
  );
};

const mapStateToProps = (state) => ({
  taxCodeOptions: getTaxCodeOptions(state),
  tax: getTaxDetails(state),
  isIrdNumberEditable: getIsIrdNumberEditable(state),

  kiwiSaver: getKiwiSaver(state),
  kiwiSaverStatusOptions: getKiwiSaverStatusOptions(state),
  employeeContributionOptions: getEmployeeContributionOptions(state),
});

export default connect(mapStateToProps)(TaxAndKiwiSaverTab);
