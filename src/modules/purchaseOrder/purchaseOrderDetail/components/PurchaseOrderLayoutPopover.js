import {
  Button,
  Icons,
  RadioButton,
  RadioButtonGroup,
} from '@myob/myob-widgets';
import React from 'react';

import Popover from '../../../../components/Feelix/Popover/Popover';
import PurchaseOrderLayout from '../types/PurchaseOrderLayout';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './PurchaseOrderLayoutPopover.module.css';

const PurchaseOrderLayoutPopover = ({
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
          checked={value === PurchaseOrderLayout.SERVICE}
          value={PurchaseOrderLayout.SERVICE}
          label="Services"
        />,
        <RadioButton
          {...feelixProps}
          checked={value === PurchaseOrderLayout.ITEM_AND_SERVICE}
          value={PurchaseOrderLayout.ITEM_AND_SERVICE}
          label="Services and items"
        />,
      ]}
    />
  );

  const triggerButton = (
    <Button
      disabled={isReadOnly}
      type="link"
      icon={<Icons.Settings />}
      iconRight
    ></Button>
  );

  const view = isReadOnly ? (
    triggerButton
  ) : (
    <Popover body={popoverBody} preferPlace="below" closeOnOuterAction>
      {triggerButton}
    </Popover>
  );

  return <div className={styles.popover}>{view}</div>;
};

export default PurchaseOrderLayoutPopover;
