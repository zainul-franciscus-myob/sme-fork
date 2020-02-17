import { addMonths } from 'date-fns';
import React from 'react';

import { PreviewType, SaleLayout } from '../../template/templateOptions';
import AUBankDepositPayment from '../../template/components/TemplatePreview/PaymentMethod/AUBankDepositPayment';
import AUChequePayment from '../../template/components/TemplatePreview/PaymentMethod/AUChequePayment';
import BpayPayment from '../../template/components/TemplatePreview/PaymentMethod/BpayPayment';
import CreditCardPayment from '../../template/components/TemplatePreview/PaymentMethod/CreditCardPayment';
import InvoiceDocumentInfo from '../../template/components/TemplatePreview/documentInfo/InvoiceDocumentInfo';
import InvoiceFooter from '../../template/components/TemplatePreview/footer/InvoiceFooter';
import InvoiceServiceItemSummary from '../../template/components/TemplatePreview/tableSummary/InvoiceServiceItemSummary';
import InvoiceServiceSummary from '../../template/components/TemplatePreview/tableSummary/InvoiceServiceSummary';
import NZBankDepositPayment from '../../template/components/TemplatePreview/PaymentMethod/NZBankDepositPayment';
import NZChequePayment from '../../template/components/TemplatePreview/PaymentMethod/NZChequePayment';
import PaymentMethod from '../../template/components/TemplatePreview/PaymentMethod/PaymentMethod';
import QuoteDocumentInfo from '../../template/components/TemplatePreview/documentInfo/QuoteDocumentInfo';
import QuoteFooter from '../../template/components/TemplatePreview/footer/QuoteFooter';
import QuoteServiceItemSummary from '../../template/components/TemplatePreview/tableSummary/QuoteServiceItemSummary';
import QuoteServiceSummary from '../../template/components/TemplatePreview/tableSummary/QuoteServiceSummary';
import Separator from '../../template/components/TemplatePreview/Separator';
import ServiceItemTable from '../../template/components/TemplatePreview/tables/ServiceItemTable';
import ServiceTable from '../../template/components/TemplatePreview/tables/ServiceTable';
import ShippingInfo from '../../template/components/TemplatePreview/ShippingInfo';
import StatementDocumentInfo from '../../template/components/TemplatePreview/documentInfo/StatementDocumentInfo';
import StatementFooter from '../../template/components/TemplatePreview/footer/StatementFooter';
import StatementTable from '../../template/components/TemplatePreview/tables/StatementTable';
import StatementTableSummary from '../../template/components/TemplatePreview/tableSummary/StatementTableSummary';
import TemplateTitle from '../../template/components/TemplatePreview/TemplateTitle';
import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';
import getShouldNotShowPaymentMethod from '../../template/components/TemplatePreview/handlers/getShouldNotShowPaymentMethod';
import getShouldShowBankDepositPayment from '../../template/components/TemplatePreview/handlers/getShouldShowBankDepositPayment';
import getShouldShowChequePayment from '../../template/components/TemplatePreview/handlers/getShouldShowChequePayment';
import getShouldShowDueDate from '../../template/components/TemplatePreview/handlers/getShouldShowDueDate';
import getShouldShowOnlinePayment from '../../template/components/TemplatePreview/handlers/getShouldShowOnlinePayment';
import styles from '../../template/components/TemplatePreview/TemplatePreview.module.css';

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
  isOnlinePaymentLoading,
  isAllowOnlinePayment,
  isAllowPaymentByDirectDeposit,
  isAllowPaymentByCheque,
}) => {
  const shouldShowOnlinePayment = getShouldShowOnlinePayment(previewType);
  const shouldShowBankDepositPayment = getShouldShowBankDepositPayment({
    previewType, isAllowPaymentByDirectDeposit,
  });
  const shouldShowChequePayment = getShouldShowChequePayment({
    previewType, isAllowPaymentByCheque,
  });
  const shouldShowDueDate = getShouldShowDueDate(previewType);

  const auPayments = {
    bPay: shouldShowOnlinePayment
      ? <BpayPayment isLoading={isOnlinePaymentLoading} isShown={isAllowOnlinePayment} />
      : undefined,
    creditCard: shouldShowOnlinePayment
      ? <CreditCardPayment isLoading={isOnlinePaymentLoading} isShown={isAllowOnlinePayment} />
      : undefined,
    bankDeposit: shouldShowBankDepositPayment ? <AUBankDepositPayment /> : undefined,
    cheque: shouldShowChequePayment ? <AUChequePayment /> : undefined,
  };
  const nzPayments = {
    bankDeposit: shouldShowBankDepositPayment ? <NZBankDepositPayment /> : undefined,
    cheque: shouldShowChequePayment ? <NZChequePayment /> : undefined,
  };

  const dueDate = shouldShowDueDate ? (
    <span>
      Due date:
      {' '}
      {formatSlashDate(addMonths(Date.now(), 1))}
    </span>
  ) : undefined;

  const payments = region === 'au' ? auPayments : nzPayments;

  const shouldNotShowPaymentMethod = getShouldNotShowPaymentMethod({
    region,
    isOnlinePaymentLoading,
    isAllowOnlinePayment,
    bankDeposit: payments.bankDeposit,
    cheque: payments.cheque,
  });

  if (!shouldNotShowPaymentMethod) {
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
  isOnlinePaymentLoading,
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
        isOnlinePaymentLoading,
        isAllowOnlinePayment,
        isAllowPaymentByDirectDeposit,
        isAllowPaymentByCheque,
      })}
      {getTemplateFooter(previewType, saleLayout)}
    </div>
  </div>
);

export default TemplatePreview;
