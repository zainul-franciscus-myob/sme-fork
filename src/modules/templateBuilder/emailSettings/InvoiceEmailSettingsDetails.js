import {
  Checkbox, CheckboxGroup, FieldGroup, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTabData } from '../../salesSettings/salesSettingsDetail/SalesSettingsDetailSelectors';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const InvoiceEmailSettingsDetails = (props) => {
  const {
    invoiceEmailBody,
    invoiceEmailSubject,
    isInvoiceNumberIncluded,
    onUpdateEmailSettings,
    fromName,
    replyToEmail,
  } = props;

  return (
    <FieldGroup label="Customise email defaults">
      <p>
        Customise the default text that’s emailed with your invoices.
        Don’t worry, you can always override these defaults when emailing an invoice.
      </p>

      <Input name="fromName" label="From name" value={fromName} onChange={handleInputChange(onUpdateEmailSettings)} />

      <Input name="replyToEmail" label="Reply-to email address" value={replyToEmail} onChange={handleInputChange(onUpdateEmailSettings)} />

      <Input
        label="Subject"
        name="invoiceEmailSubject"
        onChange={handleInputChange(onUpdateEmailSettings)}
        value={invoiceEmailSubject}
      />

      <CheckboxGroup
        hideLabel
        label="isInvoiceNumberIncluded"
        renderCheckbox={() => (
          <Checkbox
            checked={isInvoiceNumberIncluded}
            label="Include invoice number in subject"
            name="isInvoiceNumberIncluded"
            onChange={handleCheckboxChange(onUpdateEmailSettings)}
          />
        )}
      />

      <TextArea
        autoSize
        label="Message"
        name="invoiceEmailBody"
        onChange={handleInputChange(onUpdateEmailSettings)}
        resize="vertical"
        value={invoiceEmailBody}
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => getTabData(state);

export default connect(mapStateToProps)(InvoiceEmailSettingsDetails);
