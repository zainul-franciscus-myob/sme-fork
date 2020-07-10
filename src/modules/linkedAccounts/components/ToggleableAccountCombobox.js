import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import React from 'react';

import AccountCombobox from '../../../components/combobox/AccountCombobox';

const ToggleableAccountCombobox = ({
  isChecked,
  toggleName,
  toggleLabel,
  toggleHandler,
  comboboxLabel,
  comboboxSelectedId,
  comboboxItems,
  comboboxHandler,
}) => (
  <React.Fragment>
    <CheckboxGroup
      label=""
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name={toggleName}
          label={toggleLabel}
          checked={isChecked}
          onChange={toggleHandler}
        />
      )}
    />
    {isChecked && (
      <AccountCombobox
        label={comboboxLabel}
        hideLabel={false}
        items={comboboxItems}
        selectedId={comboboxSelectedId}
        onChange={comboboxHandler}
      />
    )}
  </React.Fragment>
);

export default ToggleableAccountCombobox;
