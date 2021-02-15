import {
  Card,
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTabData } from '../SalesSettingsDetailSelectors';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onCheckboxChange = (handler) => (e) => {
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
      <FieldGroup label="Email settings">
        <p>
          These email settings apply to all email sent on your behalf from MYOB.
          This includes invoices, quotes and pay slips (payroll).
        </p>
        <Input
          name="fromName"
          label="From name"
          labelAccessory={
            <Tooltip>
              The name that will display when your clients receive an invoice.
              This could be your business name or contact person.
            </Tooltip>
          }
          value={fromName}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
        <Input
          name="replyToEmail"
          label="Reply-to email address"
          labelAccessory={
            <Tooltip>
              The email address used when your clients reply to an emailed
              invoice.
            </Tooltip>
          }
          value={replyToEmail}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
      </FieldGroup>
    </Card>
  );

  const learnMoreLink = (
    <a
      href="https://help.myob.com/wiki/x/X69qAg"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn more
    </a>
  );

  const quoteEmail = (
    <Card>
      <FieldGroup label="Default invoice email">
        <p>
          Customise the default email text sent with your invoices. You can use
          variables to personalise your email. {learnMoreLink}
        </p>
        <Input
          name="invoiceEmailSubject"
          label="Subject"
          value={invoiceEmailSubject}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
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
        <p>
          Customise the default email text sent with your quotes. You can use
          variables to personalise your email. {learnMoreLink}
        </p>
        <Input
          name="quoteEmailSubject"
          label="Subject"
          value={quoteEmailSubject}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
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
        <p>
          Customise the default email text sent with your statements. You can
          use variables to personalise your email. {learnMoreLink}
        </p>
        <Input
          name="statementEmailSubject"
          label="Subject"
          value={statementEmailSubject}
          onChange={onInputChange(onUpdateEmailSettings)}
        />
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
      {emailSignature}
      {quoteEmail}
      {invoiceEmail}
      {statementEmail}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => getTabData(state);

export default connect(mapStateToProps)(SalesSettingsEmailDetails);
