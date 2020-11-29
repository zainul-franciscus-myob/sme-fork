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
  allowRemoval = true,
  checkboxLabelAccessory,
  ...otherProps
}) => (
  <>
    <CheckboxGroup
      label=""
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          disabled={!allowRemoval}
          checked={isChecked}
          label={toggleLabel}
          labelAccessory={checkboxLabelAccessory}
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
        allowClear
        {...otherProps}
      />
    )}
  </>
);

export default ToggleableAccountCombobox;
