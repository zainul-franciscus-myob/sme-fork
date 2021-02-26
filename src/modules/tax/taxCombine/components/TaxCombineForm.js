import { Columns } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getTaxCodeIdToDelete,
  getTaxCodeIdToPersist,
  getTaxCodeOptions,
  getTaxCodeToDeleteLabel,
} from '../taxCombineSelectors';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';

const TaxCombineForm = ({
  onChange,
  taxCodeOptions,
  taxCodeToDeleteLabel,
  taxCodeIdToDelete,
  taxCodeIdToPersist,
}) => {
  return (
    <Columns type="two">
      <TaxCodeCombobox
        name="delete"
        label={taxCodeToDeleteLabel}
        requiredLabel="This is required"
        items={taxCodeOptions}
        selectedId={taxCodeIdToDelete}
        onChange={handleComboboxChange('taxCodeIdToDelete', onChange)}
      />
      <TaxCodeCombobox
        name="persist"
        label="Move transaction history to"
        requiredLabel="This is required"
        items={taxCodeOptions}
        selectedId={taxCodeIdToPersist}
        onChange={handleComboboxChange('taxCodeIdToPersist', onChange)}
      />
    </Columns>
  );
};

const mapStateToProps = (state) => ({
  taxCodeOptions: getTaxCodeOptions(state),
  taxCodeToDeleteLabel: getTaxCodeToDeleteLabel(state),
  taxCodeIdToDelete: getTaxCodeIdToDelete(state),
  taxCodeIdToPersist: getTaxCodeIdToPersist(state),
});

export default connect(mapStateToProps)(TaxCombineForm);
