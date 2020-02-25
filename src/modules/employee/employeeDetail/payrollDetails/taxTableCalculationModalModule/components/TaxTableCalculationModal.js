import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasSLFSDebt,
  getHasTaxFreeThreshold,
  getIsHortiShearer,
  getIsLoading,
  getIsOpen,
  getIsWithholdingVariation,
  getMedicareLevyOptions,
  getResidencyStatusOptions,
  getSelectedMedicareLevy,
  getSelectedResidencyStatus,
  getSelectedSeniorTaxOffset,
  getSeniorTaxOffsetOptions,
  getTaxTableDescription,
  getWithholdingVariation,
} from '../taxTableCalculationModalSelectors';
import TaxTableCalculationForm from './TaxTableCalculationForm';


const TaxTableCalculationModal = ({
  isOpen,
  isLoading,
  onCancel,
  onSave,
  onFieldChange,
  selectedResidencyStatus,
  residencyStatusOptions,
  hasTaxFreeThreshold,
  hasSLFSDebt,
  isHortiShearer,
  selectedSeniorTaxOffset,
  seniorTaxOffsetOptions,
  isWithholdingVariation,
  selectedMedicareLevy,
  medicareLevyOptions,
  taxTableDescription,
  withholdingVariation,
  onWithholdingVariationBlur,
}) => {
  const view = (
    <Modal title="TFN declaration information" onCancel={onCancel}>
      <Modal.Body>
        <TaxTableCalculationForm
          isLoading={isLoading}
          onFieldChange={onFieldChange}
          selectedResidencyStatus={selectedResidencyStatus}
          residencyStatusOptions={residencyStatusOptions}
          hasTaxFreeThreshold={hasTaxFreeThreshold}
          hasSLFSDebt={hasSLFSDebt}
          isHortiShearer={isHortiShearer}
          isWithholdingVariation={isWithholdingVariation}
          selectedSeniorTaxOffset={selectedSeniorTaxOffset}
          seniorTaxOffsetOptions={seniorTaxOffsetOptions}
          selectedMedicareLevy={selectedMedicareLevy}
          medicareLevyOptions={medicareLevyOptions}
          withholdingVariation={withholdingVariation}
          taxTableDescription={taxTableDescription}
          onWithholdingVariationBlur={onWithholdingVariationBlur}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={onSave} testid="saveButton">Save</Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen ? view : null;
};

const mapStateToProps = state => ({
  isOpen: getIsOpen(state),
  selectedResidencyStatus: getSelectedResidencyStatus(state),
  residencyStatusOptions: getResidencyStatusOptions(state),
  hasTaxFreeThreshold: getHasTaxFreeThreshold(state),
  hasSLFSDebt: getHasSLFSDebt(state),
  isHortiShearer: getIsHortiShearer(state),
  isWithholdingVariation: getIsWithholdingVariation(state),
  selectedSeniorTaxOffset: getSelectedSeniorTaxOffset(state),
  seniorTaxOffsetOptions: getSeniorTaxOffsetOptions(state),
  selectedMedicareLevy: getSelectedMedicareLevy(state),
  medicareLevyOptions: getMedicareLevyOptions(state),
  withholdingVariation: getWithholdingVariation(state),
  isLoading: getIsLoading(state),
  taxTableDescription: getTaxTableDescription(state),
});

export default connect(mapStateToProps)(TaxTableCalculationModal);
