import { addMonths } from 'date-fns';
import React from 'react';

import { PreviewType, SaleLayout } from '../../templateOptions';
import AUBankDepositPayment from './PaymentMethod/AUBankDepositPayment';
import AUChequePayment from './PaymentMethod/AUChequePayment';
import BpayPayment from './PaymentMethod/BpayPayment';
import CreditCardPayment from './PaymentMethod/CreditCardPayment';
import InvoiceDocumentInfo from './documentInfo/InvoiceDocumentInfo';
import InvoiceFooter from './footer/InvoiceFooter';
import InvoiceServiceItemSummary from './tableSummary/InvoiceServiceItemSummary';
import InvoiceServiceSummary from './tableSummary/InvoiceServiceSummary';
import NZBankDepositPayment from './PaymentMethod/NZBankDepositPayment';
import NZChequePayment from './PaymentMethod/NZChequePayment';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import QuoteDocumentInfo from './documentInfo/QuoteDocumentInfo';
import QuoteFooter from './footer/QuoteFooter';
import QuoteServiceItemSummary from './tableSummary/QuoteServiceItemSummary';
import QuoteServiceSummary from './tableSummary/QuoteServiceSummary';
import Separator from './Separator';
import ServiceItemTable from './tables/ServiceItemTable';
import ServiceTable from './tables/ServiceTable';
import ShippingInfo from './ShippingInfo';
import StatementDocumentInfo from './documentInfo/StatementDocumentInfo';
import StatementFooter from './footer/StatementFooter';
import StatementTable from './tables/StatementTable';
import StatementTableSummary from './tableSummary/StatementTableSummary';
import TemplateTitle from './TemplateTitle';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';
import styles from './TemplatePreview.module.css';

const getDocInfoForPreviewType = (type) => {
  switch (type) {
    case PreviewType.Invoice:
      return <InvoiceDocumentInfo />;
    case PreviewType.Quote:
      return <QuoteDocumentInfo />;
    case PreviewType.Statement:
    default:
      return <StatementDocumentInfo />;
  }
};

const getTemplateTable = (previewType, saleLayout, region) => {
  if (previewType === PreviewType.Statement) {
    return <StatementTable />;
  }
  if (saleLayout === SaleLayout.ItemAndService) {
    return <ServiceItemTable region={region} />;
  }
  return <ServiceTable region={region} />;
};

const getTemplateTableSummary = (previewType, saleLayout, region) => {
  switch (previewType) {
    case PreviewType.Statement:
      return <StatementTableSummary />;
    case PreviewType.Quote:
      return saleLayout === SaleLayout.Service ? (
        <QuoteServiceSummary region={region} />
      ) : (
        <QuoteServiceItemSummary region={region} />
      );
    case PreviewType.Invoice:
    default:
      return saleLayout === SaleLayout.Service ? (
        <InvoiceServiceSummary region={region} />
      ) : (
        <InvoiceServiceItemSummary region={region} />
      );
  }
};

const getTemplateFooter = (previewType, saleLayout) => {
  switch (previewType) {
    case PreviewType.Statement:
      return <StatementFooter />;
    case PreviewType.Quote:
      return <QuoteFooter saleLayout={saleLayout} />;
    case PreviewType.Invoice:
    default:
      return <InvoiceFooter saleLayout={saleLayout} />;
  }
};

const getPaymentMethod = ({
  previewType,
  region,
  isAllowOnlinePayment,
  isAllowPaymentByDirectDeposit,
  isAllowPaymentByCheque,
}) => {
  const shouldShowOnlinePayment = previewType !== PreviewType.Statement && isAllowOnlinePayment;
  const isQuote = previewType === PreviewType.Quote;

  const auPayments = {
    bPay: !isQuote && shouldShowOnlinePayment ? <BpayPayment /> : undefined,
    creditCard: !isQuote && shouldShowOnlinePayment ? <CreditCardPayment /> : undefined,
    bankDeposit: !isQuote && isAllowPaymentByDirectDeposit ? <AUBankDepositPayment /> : undefined,
    cheque: !isQuote && isAllowPaymentByCheque ? <AUChequePayment /> : undefined,
  };
  const nzPayments = {
    bankDeposit: !isQuote && isAllowPaymentByDirectDeposit ? <NZBankDepositPayment /> : undefined,
    cheque: !isQuote && isAllowPaymentByCheque ? <NZChequePayment /> : undefined,
  };

  const dueDate = previewType === PreviewType.Invoice ? (
    <span>
      Due date:
      {' '}
      {formatSlashDate(addMonths(Date.now(), 1))}
    </span>
  ) : undefined;

  const payments = region === 'au' ? auPayments : nzPayments;

  if (Object.values(payments).reduce((a, p) => !!(a || p), false)) {
    return <PaymentMethod rightHeader={dueDate} {...payments} />;
  }
  return <div />;
};

const TemplatePreview = ({
  featureColour,
  headerTextColour,
  useAddressEnvelopePosition,
  isLogoOnTheLeft,
  headerBusinessDetailsStyle,
  logoImage,
  logoSize,
  headerImage,
  businessName,
  tradingName,
  streetAddress,
  phoneNumber,
  email,
  website,
  abn,
  previewType,
  saleLayout,
  region,
  isAllowOnlinePayment,
  isAllowPaymentByDirectDeposit,
  isAllowPaymentByCheque,
}) => (
  <div className={styles.wrapper}>
    <div>
      <TemplateTitle
        headerTextColour={headerTextColour}
        isLogoOnTheLeft={isLogoOnTheLeft}
        headerBusinessDetailsStyle={headerBusinessDetailsStyle}
        logoImage={logoImage}
        logoSize={logoSize}
        headerImage={headerImage}
        businessName={businessName}
        tradingName={tradingName}
        streetAddress={streetAddress}
        phoneNumber={phoneNumber}
        email={email}
        website={website}
        abn={abn}
      />
      {getDocInfoForPreviewType(previewType)}
      <ShippingInfo
        previewType={previewType}
        useAddressEnvelopePosition={useAddressEnvelopePosition}
      />
      <Separator featureColour={featureColour} />
      {getTemplateTable(previewType, saleLayout, region)}
      {getTemplateTableSummary(previewType, saleLayout, region)}
    </div>
    <div>
      {getPaymentMethod({
        previewType,
        region,
        isAllowOnlinePayment,
        isAllowPaymentByDirectDeposit,
        isAllowPaymentByCheque,
      })}
      {getTemplateFooter(previewType, saleLayout)}
    </div>
  </div>
);

export default TemplatePreview;
