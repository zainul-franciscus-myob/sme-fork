import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployeeContributionOptions,
  getEsct,
  getEsctOptions,
  getIsIrdNumberEditable,
  getKiwiSaver,
  getKiwiSaverStatusOptions,
  getTaxCodeOptions,
  getTaxDetails,
} from '../TaxAndKiwiSaverSelectors';
import EsctRate from './EsctRate';
import KiwiSaver from './KiwiSaver';
import TaxDeclaration from './TaxDeclaration';

const TaxAndKiwiSaverTab = ({
  taxCodeOptions,
  tax,
  isIrdNumberEditable,
  onTaxChange,
  onIrdNumberOnBlur,
  onTaxCodeChange,
  kiwiSaver,
  onKiwiSaverChange,
  employeeContributionOptions,
  kiwiSaverStatusOptions,
  esctRate,
  esctOptions,
}) => {
  return (
    <FormHorizontal layout="primary">
      <TaxDeclaration
        taxCodeOptions={taxCodeOptions}
        tax={tax}
        isIrdNumberEditable={isIrdNumberEditable}
        onTaxInputChange={onTaxChange}
        onTaxInputBlur={onIrdNumberOnBlur}
        onTaxCodeChange={onTaxCodeChange}
      />
      <KiwiSaver
        kiwiSaver={kiwiSaver}
        kiwiSaverStatusOptions={kiwiSaverStatusOptions}
        employeeContributionOptions={employeeContributionOptions}
        onKiwiSaverInputChange={onKiwiSaverChange}
      />
      <EsctRate
        esctRate={esctRate}
        esctOptions={esctOptions}
        onEsctRateChange={onKiwiSaverChange}
      />
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

  esctRate: getEsct(state),
  esctOptions: getEsctOptions(state),
});

export default connect(mapStateToProps)(TaxAndKiwiSaverTab);
