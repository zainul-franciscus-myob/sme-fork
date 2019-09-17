import { FieldGroup, FormHorizontal } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import Combobox from '../../../../../components/Feelix/ComboBox/Combobox';
import TfnInput from '../../../../../components/autoFormatter/TfnInput/TfnInput';
import handleAmountInputChange from '../../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
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
}) => (
  <div className={styles.taxView}>
    <FormHorizontal>
      <FieldGroup label="Tax details">
        <TfnInput
          name="taxFileNumber"
          label="Tax file number"
          value={taxFileNumber}
          onChange={handleInputChange(onPayrollTaxDetailsChange)}
        />
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
          decimalScale={4}
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
          decimalScale={2}
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
          decimalScale={2}
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
