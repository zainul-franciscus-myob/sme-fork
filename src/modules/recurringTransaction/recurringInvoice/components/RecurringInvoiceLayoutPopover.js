import {
  Button,
  RadioButton,
  RadioButtonGroup,
  SettingsIcon,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsReadOnly,
  getIsSubmitting,
  getLayout,
} from '../selectors/RecurringInvoiceSelectors';
import Popover from '../../../../components/Feelix/Popover/Popover';
import SalesLayout from '../../types/SalesLayout';
import styles from './RecurringInvoiceLayoutPopover.module.css';

const RecurringInvoiceLayoutPopover = ({
  isSubmitting,
  layout,
  isReadOnly,
  onUpdateInvoiceLayout,
}) => {
  const layoutBody = (
    <RadioButtonGroup
      label="Field layout"
      value={layout}
      onChange={onUpdateInvoiceLayout}
      className={styles.popoverBody}
      disabled={isSubmitting}
      renderRadios={({ value, ...feelixProps }) => [
        <RadioButton
          {...feelixProps}
          checked={value === SalesLayout.SERVICE}
          value={SalesLayout.SERVICE}
          label="Services"
        />,
        <RadioButton
          {...feelixProps}
          checked={value === SalesLayout.ITEM_AND_SERVICE}
          value={SalesLayout.ITEM_AND_SERVICE}
          label="Services and items"
        />,
      ]}
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

const mapStateToProps = (state) => ({
  isSubmitting: getIsSubmitting(state),
  layout: getLayout(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(RecurringInvoiceLayoutPopover);
