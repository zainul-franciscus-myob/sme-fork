import {
  Card, Checkbox, CheckboxGroup, FieldGroup, Input, TextArea,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getTabData } from '../SalesSettingsDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const SalesSettingsEmailDetails = (props) => {
  const {
    fromName,
    replyToEmail,
    invoiceEmailSubject,
    invoiceEmailBody,
    isInvoiceNumberIncluded,
    quoteEmailSubject,
    quoteEmailBody,
    isQuoteNumberIncluded,
    statementEmailSubject,
    statementEmailBody,
    onUpdateEmailSettings,
  } = props;

  const emailSignature = (
    <Card>
      <FieldGroup label="Email signature">
        <p>
          Customise your email signature and the email address your invoices are sent from.
          Also, choose whether or not to send PDF attachments with your emails.
        </p>
        <Input name="fromName" label="From name" value={fromName} onChange={onInputChange(onUpdateEmailSettings)} />
        <Input name="replyToEmail" label="Reply-to email address" value={replyToEmail} onChange={onInputChange(onUpdateEmailSettings)} />
      </FieldGroup>
    </Card>
  );

  const quoteEmail = (
    <Card>
      <FieldGroup label="Default invoice email">
        <p>Customise the default email text sent with your invoices.</p>
        <Input name="invoiceEmailSubject" label="Subject" value={invoiceEmailSubject} onChange={onInputChange(onUpdateEmailSettings)} />
        <CheckboxGroup
          label="isInvoiceNumberIncluded"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isInvoiceNumberIncluded"
              label="Include invoice number in subject"
              checked={isInvoiceNumberIncluded}
              onChange={onCheckboxChange(onUpdateEmailSettings)}
            />
          )}
        />
        <TextArea
          name="invoiceEmailBody"
          label="Message"
          autoSize
          resize="vertical"
          value={invoiceEmailBody}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
      </FieldGroup>
    </Card>
  );

  const invoiceEmail = (
    <Card>
      <FieldGroup label="Default quote email">
        <p>Customise the default email text sent with your quotes.</p>
        <Input name="quoteEmailSubject" label="Subject" value={quoteEmailSubject} onChange={onInputChange(onUpdateEmailSettings)} />
        <CheckboxGroup
          label="isQuoteNumberIncluded"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isQuoteNumberIncluded"
              label="Include quote number in subject"
              checked={isQuoteNumberIncluded}
              onChange={onCheckboxChange(onUpdateEmailSettings)}
            />
          )}
        />
        <TextArea
          name="quoteEmailBody"
          label="Message"
          autoSize
          resize="vertical"
          value={quoteEmailBody}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
      </FieldGroup>
    </Card>
  );

  const statementEmail = (
    <Card>
      <FieldGroup label="Default statement email">
        <p>Customise the default email text sent with your statements.</p>
        <Input name="statementEmailSubject" label="Subject" value={statementEmailSubject} onChange={onInputChange(onUpdateEmailSettings)} />
        <TextArea
          name="statementEmailBody"
          label="Message"
          autoSize
          resize="vertical"
          value={statementEmailBody}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
      </FieldGroup>
    </Card>
  );

  return (
    <React.Fragment>
      { emailSignature }
      { quoteEmail }
      { invoiceEmail }
      { statementEmail }
    </React.Fragment>
  );
};

SalesSettingsEmailDetails.propTypes = {
  fromName: PropTypes.string.isRequired,
  replyToEmail: PropTypes.string.isRequired,
  invoiceEmailSubject: PropTypes.string.isRequired,
  invoiceEmailBody: PropTypes.string.isRequired,
  isInvoiceNumberIncluded: PropTypes.bool.isRequired,
  quoteEmailSubject: PropTypes.string.isRequired,
  quoteEmailBody: PropTypes.string.isRequired,
  isQuoteNumberIncluded: PropTypes.bool.isRequired,
  onUpdateEmailSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => getTabData(state);

export default connect(mapStateToProps)(SalesSettingsEmailDetails);
