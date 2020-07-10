import { connect } from 'react-redux';
import React from 'react';

import {
  getTaxCodeId,
  getTaxCodeLabel,
  getTaxCodes,
} from '../accountModalSelectors';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';

const AccountTaxCode = ({ taxCodeId, taxCodes, onChange, fieldlabel }) => (
  <TaxCodeCombobox
    label={fieldlabel}
    requiredLabel="This is required"
    hideLabel={false}
    name="taxCodeId"
    items={taxCodes}
    selectedId={taxCodeId}
    onChange={handleComboboxChange('taxCodeId', onChange)}
    width="sm"
  />
);

const mapStateToProps = (state) => ({
  taxCodeId: getTaxCodeId(state),
  taxCodes: getTaxCodes(state),
  fieldlabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(AccountTaxCode);
