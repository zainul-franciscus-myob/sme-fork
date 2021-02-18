import {
  Button,
  RadioButton,
  RadioButtonGroup,
  SettingsIcon,
} from '@myob/myob-widgets';
import React from 'react';

import Popover from '../../../components/Feelix/Popover/Popover';
import styles from './RecurringLineItemLayoutOptions.module.css';

const RecurringLineItemLayoutOptions = ({
  layout,
  layoutOptions = [],
  isReadOnly,
  isDisabled,
  onUpdateLayout,
}) => {
  const layoutBody = (
    <RadioButtonGroup
      label="Field layout"
      value={layout}
      onChange={onUpdateLayout}
      className={styles.popoverBody}
      disabled={isDisabled}
      renderRadios={({ value, ...feelixProps }) =>
        layoutOptions.map((option) => (
          <RadioButton
            {...feelixProps}
            checked={value === option.value}
            value={option.value}
            label={option.label}
          />
        ))
      }
    />
  );

  const triggerButton = (
    <Button
      disabled={isReadOnly}
      type="link"
      icon={<SettingsIcon />}
      iconRight
    ></Button>
  );

  const view = isReadOnly ? (
    triggerButton
  ) : (
    <Popover body={layoutBody} preferPlace="below" closeOnOuterAction>
      {triggerButton}
    </Popover>
  );

  return <div className={styles.popover}>{view}</div>;
};

export default RecurringLineItemLayoutOptions;
