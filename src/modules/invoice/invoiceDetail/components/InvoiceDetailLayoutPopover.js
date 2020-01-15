import {
  Button, Icons, RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubmitting, getLayout } from '../selectors/invoiceDetailSelectors';
import InvoiceLayout from '../InvoiceLayout';
import Popover from '../../../../components/Feelix/Popover/Popover';
import styles from './InvoiceDetailLayoutPopover.module.css';

const InvoiceDetailLayoutPopover = ({
  isSubmitting,
  layout,
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
          checked={value === InvoiceLayout.ITEM}
          value={InvoiceLayout.ITEM}
          label="Services and items"
        />,
      ]}
    />
  );

  return (
    <div className={styles.popover}>
      <Popover body={layoutBody} preferPlace="below" closeOnOuterAction>
        <Button type="link" icon={<Icons.Settings />} iconRight>Field layout</Button>
      </Popover>
    </div>
  );
};

const mapStateToProps = state => ({
  isSubmitting: getIsSubmitting(state),
  layout: getLayout(state),
});

export default connect(mapStateToProps)(InvoiceDetailLayoutPopover);
