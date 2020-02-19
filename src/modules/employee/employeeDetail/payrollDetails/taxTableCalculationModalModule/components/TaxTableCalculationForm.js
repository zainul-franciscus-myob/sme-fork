import {
  Alert, Checkbox, Field, Input, Select, Separator, Spinner,
} from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import LinkButton from '../../../../../../components/Button/LinkButton';
import handleAmountInputChange from '../../../../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../../../../components/handlers/handleCheckboxChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';
import styles from './TaxTableCalculationModal.module.css';

const atoLink = (
  <LinkButton
    href="https://www.ato.gov.au/Rates/Tax-tables/"
    isOpenInNewTab
    className={styles.linkButton}
  >
    visit the ATO.
  </LinkButton>
);

const TaxTableCalculationForm = ({
  isLoading,
  selectedResidencyStatus,
  residencyStatusOptions,
  hasTaxFreeThreshold,
  hasSLFDebt,
  isHortiShearer,
  isWithholdingVariation,
  selectedSeniorTaxOffset,
  seniorTaxOffsetOptions,
  selectedMedicareLevy,
  medicareLevyOptions,
  withholdingVariation,
  taxTableDescription,
  onFieldChange,
  onWithholdingVariationBlur,
}) => (
  <div className={styles.taxTableForm}>
    <Select
      label="Residency Status"
      value={selectedResidencyStatus}
      onChange={handleSelectChange(onFieldChange)}
      name="selectedResidencyStatus"
    >
      {residencyStatusOptions.map(option => (
        <Select.Option value={option.value} label={option.label} key={option.value} />
      ))}
    </Select>
    <Checkbox
      label="Tax free threshold is being claimed"
      name="hasTaxFreeThreshold"
      testid="hasTaxFreeThreshold"
      checked={hasTaxFreeThreshold}
      onChange={handleCheckboxChange(onFieldChange)}
    />
    <Checkbox
      label="Higher Education Loan Program (HELP), VET Student Loan (VSL), Financial Supplement
        (FS), Student Start-up Loan (SSL) or Trade Support Loan (TSL) debt"
      checked={hasSLFDebt}
      name="hasSLFDebt"
      onChange={handleCheckboxChange(onFieldChange)}
    />
    <Checkbox
      label="Horticultural/Shearer"
      checked={isHortiShearer}
      name="isHortiShearer"
      onChange={handleCheckboxChange(onFieldChange)}
    />
    <Checkbox
      label="Has approved withholding variation"
      checked={isWithholdingVariation}
      name="isWithholdingVariation"
      onChange={handleCheckboxChange(onFieldChange)}
    />
    {isWithholdingVariation && (
      <AmountInput
        key="withholdingVariation"
        name="withholdingVariation"
        testid="withholdingVariation"
        label="Withholding variation rate (%)"
        decimalScale={4}
        numeralIntegerScale={3}
        numeralPositiveOnly
        value={withholdingVariation}
        onChange={handleAmountInputChange(onFieldChange)}
        textAlign="right"
        onBlur={handleAmountInputChange(onWithholdingVariationBlur)}
      />
    )}
    <Select
      label="Senior and Pensioners Tax Offset claimed"
      value={selectedSeniorTaxOffset}
      onChange={handleSelectChange(onFieldChange)}
      name="selectedSeniorTaxOffset"
    >
      {seniorTaxOffsetOptions.map(option => (
        <Select.Option value={option.value} label={option.label} key={option.value} />
      ))}
    </Select>
    <Select
      label="Medicare levy exemption claimed"
      value={selectedMedicareLevy}
      onChange={handleSelectChange(onFieldChange)}
      name="selectedMedicareLevy"
    >
      {medicareLevyOptions.map(option => (
        <Select.Option value={option.value} label={option.label} key={option.value} />
      ))}
    </Select>
    <Separator />
    {taxTableDescription || isLoading ? (
      <>
        <p>
        From your tax answers, below is the relevant tax table for your employee.
        If you need more information on tax tables please
          {' '}
          {atoLink}
        </p>
        <span className={styles.taxTableResult}>
          <Field
            label="Tax table"
            renderField={() => (
              <>
                <Input
                  disabled
                  value={taxTableDescription}
                  name="taxTableResult"
                  testid="taxTableResult"
                  label=""
                />
                {isLoading && (
                  <Spinner size="small" />
                )}
              </>
            )}
          />
        </span>
      </>
    ) : (
      <Alert
        type="danger"
        testid="noTaxTableAlert"
      >
        From your answers, no relevant tax table could be selected. Please review your answers or
        choose your tax table manually on the previous window. For more information on tax tables
        {' '}
        {atoLink}
      </Alert>
    )}
  </div>
);

export default TaxTableCalculationForm;
