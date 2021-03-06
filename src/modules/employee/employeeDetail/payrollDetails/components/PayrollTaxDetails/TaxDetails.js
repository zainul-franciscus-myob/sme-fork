import {
  Button,
  Combobox,
  Field,
  FieldGroup,
  FormHorizontal,
  Icons,
  Select,
} from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import TfnInput from '../../../../../../components/autoFormatter/TfnInput/TfnInput';
import handleAmountInputChange from '../../../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';
import styles from './TaxDetails.module.css';

const comboboxMetaData = [{ columnName: 'description', showData: true }];

const TaxDetails = ({
  taxTablesOptions,
  selectedTaxTable,
  taxDetails: {
    extraTax,
    totalRebates,
    taxFileNumber,
    withholdingVariationRate,
  },
  onPayrollTaxDetailsChange,
  taxFileNumberStatusOptions,
  taxFileNumberStatus,
  onTaxFileNumberStatusChange,
  onTfnModalLinkClick,
  isTfnEditable,
}) => (
  <div className={styles.taxView}>
    <FormHorizontal>
      <FieldGroup label="Tax details">
        <Select
          name="taxFileNumberStatus"
          label="Tax file number (TFN) status"
          value={taxFileNumberStatus}
          onChange={handleSelectChange(onTaxFileNumberStatusChange)}
        >
          {taxFileNumberStatusOptions &&
            taxFileNumberStatusOptions.map(({ name, value }) => (
              <Select.Option key={name} value={value} label={name} />
            ))}
        </Select>
        <TfnInput
          name="taxFileNumber"
          label="Tax file number"
          value={taxFileNumber}
          onChange={handleInputChange(onPayrollTaxDetailsChange)}
          disabled={!isTfnEditable}
        />
      </FieldGroup>
      <FieldGroup label="Tax table calculations">
        <Field
          testid="taxTableCalculationLinkField"
          renderField={() => (
            <>
              Select a tax table using the TFN declaration questions.
              <br />
              <Button
                type="link"
                icon={<Icons.Edit />}
                onClick={onTfnModalLinkClick}
              >
                Fill out TFN declaration questions
              </Button>
            </>
          )}
        />
        <Combobox
          label="Tax table"
          hideLabel={false}
          metaData={comboboxMetaData}
          selected={selectedTaxTable}
          items={taxTablesOptions}
          onChange={handleComboboxChange(
            'taxTableId',
            onPayrollTaxDetailsChange
          )}
        />
        <AmountInput
          key="withholdingVariationRate"
          name="withholdingVariationRate"
          label="Withholding variation rate %"
          numeralDecimalScaleMin={2}
          numeralDecimalScaleMax={4}
          numeralIntegerScale={3}
          numeralPositiveOnly
          value={withholdingVariationRate}
          onChange={handleAmountInputChange(onPayrollTaxDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollTaxDetailsChange)}
          disabled={!selectedTaxTable.allowsVariationRate}
        />
        <AmountInput
          key="totalRebates"
          name="totalRebates"
          label="Total rebates per year ($)"
          numeralDecimalScaleMin={2}
          numeralDecimalScaleMax={2}
          numeralIntegerScale={13}
          value={totalRebates}
          onChange={handleAmountInputChange(onPayrollTaxDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollTaxDetailsChange)}
          disabled={!selectedTaxTable.allowsRebates}
        />
        <AmountInput
          key="extraTax"
          name="extraTax"
          label="Extra tax per pay ($)"
          numeralDecimalScaleMin={2}
          numeralDecimalScaleMax={2}
          numeralIntegerScale={13}
          value={extraTax}
          onChange={handleAmountInputChange(onPayrollTaxDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollTaxDetailsChange)}
        />
      </FieldGroup>
    </FormHorizontal>
  </div>
);

export default TaxDetails;
