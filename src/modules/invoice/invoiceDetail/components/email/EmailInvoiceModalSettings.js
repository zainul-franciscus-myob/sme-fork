import {
  Box,
  Button,
  CloseIcon,
  Select,
  Spinner,
  TickIcon,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getIsPreviewingPdf,
  getPaymentOptions,
} from '../../selectors/emailSelectors';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import styles from './EmailInvoiceModalSettings.module.css';

const EmailInvoiceModalSettings = ({
  emailInvoiceDetail,
  isPreviewingPdf,
  onCustomiseTemplateLinkClick,
  onEmailInvoiceDetailChange,
  onManagePaymentOptionClick,
  onPreviewPdfButtonClick,
  paymentOptions,
  templateOptions,
}) => {
  const paymentOptionIcon = (isOptionAvailable) =>
    isOptionAvailable ? (
      <div className={classNames(styles.paymentOptionAvailable, styles.tick)}>
        <TickIcon />
      </div>
    ) : (
      <div
        className={classNames(styles.paymentOptionUnavailable, styles.cross)}
      >
        <CloseIcon />
      </div>
    );

  return (
    <>
      <h3>Settings</h3>
      <div className={styles.templateSettings}>
        <div className={styles.templateSettingsHeading}>
          <span>Invoice template</span>
          <div>
            <Box marginRight="xTiny">
              <Button type="link" onClick={onCustomiseTemplateLinkClick}>
                Customise template
              </Button>
            </Box>
            <Tooltip
              container={() => document.querySelector('#emailInvoiceModal')}
            >
              Change colours, add your logo, and more. You can also create
              multiple templates for different occasions.
            </Tooltip>
          </div>
        </div>
        <div className={styles.templateSettingsFields}>
          <Select
            name="templateName"
            value={emailInvoiceDetail.templateName}
            onChange={handleSelectChange(onEmailInvoiceDetailChange)}
          >
            {templateOptions.map(({ name, label }) => (
              <Select.Option value={name} label={label} key={name} />
            ))}
          </Select>
          <div className={styles.previewButton}>
            <Box display="flex" alignItems="center">
              <Button
                type="secondary"
                disabled={isPreviewingPdf}
                onClick={onPreviewPdfButtonClick}
              >
                Preview PDF
              </Button>
              {isPreviewingPdf && (
                <Box marginLeft="xTiny">
                  <Spinner size="small" />
                </Box>
              )}
            </Box>
          </div>
        </div>
      </div>
      <div className={styles.paymentSettingsHeading}>
        <span>Payment options</span>
        <div>
          <Box marginRight="xTiny">
            <Button type="link" onClick={onManagePaymentOptionClick}>
              Manage payment options
            </Button>
          </Box>
          <Tooltip
            container={() => document.querySelector('#emailInvoiceModal')}
          >
            Edit details and select the payment options you want to include on
            your sales invoice.
          </Tooltip>
        </div>
      </div>
      <div className={styles.paymentSettings}>
        {paymentOptions.map((option) => (
          <div className={styles.paymentOption}>
            {paymentOptionIcon(option.isAvailable)}
            <span>{option.option}</span>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isPreviewingPdf: getIsPreviewingPdf(state),
  paymentOptions: getPaymentOptions(state),
});

export default connect(mapStateToProps)(EmailInvoiceModalSettings);
