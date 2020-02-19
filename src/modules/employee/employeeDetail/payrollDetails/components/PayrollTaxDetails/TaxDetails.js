import {
  Button, Combobox, Field, FieldGroup, FormHorizontal, Icons, Select,
} from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxTableCalculationsModalEnabled from '../../../../../../common/featureToggles/TaxTableCalculationModalEnabled';
import TfnInput from '../../../../../../components/autoFormatter/TfnInput/TfnInput';
import handleAmountInputChange from '../../../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';
import styles from './TaxDetails.module.css';

const comboboxMetaData = [
  { columnName: 'description', showData: true },
];

const TaxDetails = ({
  taxTablesOptions,
  selectedTaxTable,
  taxDetails: {
    extraTax,
    taxFileNumber,
    totalRebates,
    withholdingVariationRate,
  },
  onPayrollTaxDetailsChange,
  onPayrollTaxAmountBlur,
  taxFileNumberStatusOptions,
  taxFileNumberStatus,
  onTaxFileNumberStatusChange,
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
          {taxFileNumberStatusOptions && taxFileNumberStatusOptions.map(({ name, value }) => (
            <Select.Option key={name} value={value} label={name} />
          ))}
        </Select>
        <TfnInput
          name="taxFileNumber"
          label="Tax file number"
          value={taxFileNumber}
          onChange={handleInputChange(onPayrollTaxDetailsChange)}
          requiredLabel="Tax file number is required"
        />
      </FieldGroup>
      <FieldGroup label="Tax table calculations">
        {TaxTableCalculationsModalEnabled && (
          <Field
            testid="taxTableCalculationLinkField"
            renderField={() => (
              <>
                Select a tax table. Use the TFN declaration questions to assist.
                <br />
                <Button type="link" icon={<Icons.Edit />}>Fill out TFN declaration questions</Button>
              </>
            )}
          />
        )}
        <Combobox
          label="Tax table"
          hideLabel={false}
          hintText="Choose tax table"
          metaData={comboboxMetaData}
          selected={selectedTaxTable}
          items={taxTablesOptions}
          onChange={handleComboboxChange('taxTableId', onPayrollTaxDetailsChange)}
        />
        <AmountInput
          key="withholdingVariationRate"
          name="withholdingVariationRate"
          label="Withholding variation rate %"
          numeralDecimalScaleMax={4}
          numeralIntegerScale={3}
          numeralPositiveOnly
          value={withholdingVariationRate}
          onChange={handleAmountInputChange(onPayrollTaxDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollTaxAmountBlur)}
          disabled={!selectedTaxTable.allowsVariationRate}
        />
        <AmountInput
          key="totalRebates"
          name="totalRebates"
          label="Total rebates per year ($)"
          numeralDecimalScaleMax={2}
          numeralIntegerScale={13}
          value={totalRebates}
          onChange={handleAmountInputChange(onPayrollTaxDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollTaxAmountBlur)}
          disabled={!selectedTaxTable.allowsRebates}
        />
        <AmountInput
          key="extraTax"
          name="extraTax"
          label="Extra tax per pay ($)"
          numeralDecimalScaleMax={2}
          numeralIntegerScale={13}
          value={extraTax}
          onChange={handleAmountInputChange(onPayrollTaxDetailsChange)}
          onBlur={handleAmountInputChange(onPayrollTaxAmountBlur)}
        />
      </FieldGroup>
    </FormHorizontal>
  </div>
);

export default TaxDetails;
