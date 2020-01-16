import {
  Card, Checkbox, CheckboxGroup, FieldGroup, Input, PageHead, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceEmailBody,
  getInvoiceEmailSubject,
  getIsInvoiceNumberIncluded,
} from '../SalesSettingsDetailSelectors';

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const InvoiceEmailSettingsDetails = (
  invoiceEmailBody,
  onUpdateEmailSettings,
  isInvoiceNumberIncluded,
  invoiceEmailSubject,
) => (
  <Card
    header={<Card.Header child={<PageHead title="Customise email defaults" />} />}
    body={(
      <Card.Body child={(
        <FieldGroup label="Default invoice email" hideLabel>
          <p>
            Customise the default text that’s emailed with your invoices.
            Don’t worry, you can always override these defaults when emailing an invoice.
          </p>

          <Input
            label="Subject"
            name="invoiceEmailSubject"
            onChange={onInputChange(onUpdateEmailSettings)}
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
                onChange={onCheckboxChange(onUpdateEmailSettings)}
              />
            )}
          />

          <TextArea
            autoSize
            label="Message"
            name="invoiceEmailBody"
            onChange={onInputChange(onUpdateEmailSettings)}
            resize="vertical"
            value={invoiceEmailBody}
          />
        </FieldGroup>
      )}
      />
    )}
  />
);

const mapStateToProps = state => ({
  invoiceEmailBody: getInvoiceEmailBody(state),
  invoiceEmailSubject: getInvoiceEmailSubject(state),
  isInvoiceNumberIncluded: getIsInvoiceNumberIncluded(state),
});

export default connect(mapStateToProps)(InvoiceEmailSettingsDetails);
