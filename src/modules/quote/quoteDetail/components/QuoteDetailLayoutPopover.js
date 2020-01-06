import {
  Button, Icons, Popover, RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import React from 'react';

import QuoteLayout from '../QuoteLayout';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './QuoteDetailLayoutPopover.module.css';

const QuoteDetailLayoutPopover = ({
  layout,
  isCalculating,
  onUpdateLayout,
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

  return (
    <div className={styles.popover}>
      <Popover body={popoverBody} preferPlace="below" closeOnOuterAction>
        <Button type="link" icon={<Icons.Settings />}>
          Field layout
        </Button>
      </Popover>
    </div>
  );
};

export default QuoteDetailLayoutPopover;
