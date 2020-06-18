import {
  Button, Icons, RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import React from 'react';

import BillLayout from '../types/BillLayout';
import Popover from '../../../../components/Feelix/Popover/Popover';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './BillLayoutPopover.module.css';

const BillLayoutPopover = ({
  layout,
  isCalculating,
  onUpdateLayout,
  isReadOnly,
}) => {
  const popoverBody = (
    <RadioButtonGroup
      name="layout"
      label="Field layout"
      value={layout}
      disabled={isCalculating}
      className={styles.popoverBody}
      onChange={handleRadioButtonChange('layout', onUpdateLayout)}
      renderRadios={({ value, ...feelixProps }) => [
        <RadioButton
          {...feelixProps}
          checked={value === BillLayout.SERVICE}
          value={BillLayout.SERVICE}
          label="Services"
        />,
        <RadioButton
          {...feelixProps}
          checked={value === BillLayout.ITEM_AND_SERVICE}
          value={BillLayout.ITEM_AND_SERVICE}
          label="Services and items"
        />,
      ]}
    />
  );

  const triggerButton = (
    <Button disabled={isReadOnly} type="link" icon={<Icons.Settings />} iconRight>
      Field layout
    </Button>
  );

  const view = isReadOnly ? triggerButton : (
    <Popover body={popoverBody} preferPlace="below" closeOnOuterAction>
      {triggerButton}
    </Popover>
  );

  return (
    <div className={styles.popover}>
      {view}
    </div>
  );
};

export default BillLayoutPopover;
