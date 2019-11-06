import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeId, getTaxCodeLabel, getTaxCodes } from '../accountDetailSelectors';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import style from './AccountTaxCode.module.css';

const AccountTaxCode = ({
  taxCodeId, taxCodes, onChange, fieldlabel,
}) => (
  <div className={style.taxCode}>
    <TaxCodeCombobox
      label={fieldlabel}
      requiredLabel="This is required"
      hideLabel={false}
      name="taxCodeId"
      items={taxCodes}
      selectedId={taxCodeId}
      onChange={handleComboboxChange('taxCodeId', onChange)}
    />
  </div>
);

const mapStateToProps = state => ({
  taxCodeId: getTaxCodeId(state),
  taxCodes: getTaxCodes(state),
  fieldlabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(AccountTaxCode);
