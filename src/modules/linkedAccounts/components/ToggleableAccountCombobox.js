import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import React from 'react';

import AccountCombobox from '../../../components/combobox/AccountCombobox';

const ToggleableAccountCombobox = ({
  comboboxHandler,
  comboboxItems,
  comboboxLabel,
  comboboxSelectedId,
  isChecked,
  toggleHandler,
  toggleLabel,
  toggleName,
  ...otherProps
}) => (
  <>
    <CheckboxGroup
      label=""
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          checked={isChecked}
          label={toggleLabel}
          name={toggleName}
          onChange={toggleHandler}
        />
      )}
    />
    {isChecked && (
      <AccountCombobox
        hideLabel={false}
        items={comboboxItems}
        label={comboboxLabel}
        onChange={comboboxHandler}
        selectedId={comboboxSelectedId}
        {...otherProps}
      />
    )}
  </>
);

export default ToggleableAccountCombobox;
