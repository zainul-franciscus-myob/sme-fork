import {
  Button, Icons, RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import React from 'react';

import Popover from '../../../../components/Feelix/Popover/Popover';
import QuoteLayout from '../QuoteLayout';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './QuoteDetailLayoutPopover.module.css';

const QuoteDetailLayoutPopover = ({
  layout,
  isCalculating,
  onUpdateLayout,
  isReadOnlyLayout,
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
          checked={value === QuoteLayout.SERVICE}
          value={QuoteLayout.SERVICE}
          label="Services"
        />,
        <RadioButton
          {...feelixProps}
          checked={value === QuoteLayout.ITEM_AND_SERVICE}
          value={QuoteLayout.ITEM_AND_SERVICE}
          label="Services and items"
        />,
      ]}
    />
  );

  const triggerButton = (
    <Button disabled={isReadOnlyLayout} type="link" icon={<Icons.Settings />} iconRight>
      Field layout
    </Button>
  );

  const view = isReadOnlyLayout ? triggerButton : (
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

export default QuoteDetailLayoutPopover;
