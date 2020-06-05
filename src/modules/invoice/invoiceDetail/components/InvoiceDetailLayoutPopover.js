import {
  Button, Icons, RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsReadOnly, getIsSubmitting, getLayout } from '../selectors/invoiceDetailSelectors';
import InvoiceLayout from '../types/InvoiceLayout';
import Popover from '../../../../components/Feelix/Popover/Popover';
import styles from './InvoiceDetailLayoutPopover.module.css';

const InvoiceDetailLayoutPopover = ({
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
          checked={value === InvoiceLayout.SERVICE}
          value={InvoiceLayout.SERVICE}
          label="Services"
        />,
        <RadioButton
          {...feelixProps}
          checked={value === InvoiceLayout.ITEM_AND_SERVICE}
          value={InvoiceLayout.ITEM_AND_SERVICE}
          label="Services and items"
        />,
      ]}
    />
  );

  const triggerButton = (
    <Button disabled={isReadOnly} type="link" icon={<Icons.Settings />} iconRight>Field layout</Button>
  );

  const view = isReadOnly ? triggerButton : (
    <Popover body={layoutBody} preferPlace="below" closeOnOuterAction>
      {triggerButton}
    </Popover>
  );

  return (
    <div className={styles.popover}>
      {view}
    </div>
  );
};

const mapStateToProps = state => ({
  isSubmitting: getIsSubmitting(state),
  layout: getLayout(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(InvoiceDetailLayoutPopover);
