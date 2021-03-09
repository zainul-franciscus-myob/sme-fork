import { Box, CloseIcon, TickIcon } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPaymentOptions } from '../selectors/exportPdfSelectors';
import styles from './InvoiceDetailPaymentOptions.module.css';

const InvoiceDetailPaymentOptions = ({ paymentOptions }) => {
  const paymentOptionIcon = (isOptionAvailable) =>
    isOptionAvailable ? (
      <TickIcon className={styles.tick} />
    ) : (
      <CloseIcon className={styles.close} />
    );

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
      {paymentOptions.map((option) => (
        <Box
          alignItems="center"
          className={styles.paymentOptions}
          display="flex"
          flexWrap="nowrap"
        >
          {paymentOptionIcon(option.isAvailable)}
          {option.option}
        </Box>
      ))}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  paymentOptions: getPaymentOptions(state),
});

export default connect(mapStateToProps)(InvoiceDetailPaymentOptions);
