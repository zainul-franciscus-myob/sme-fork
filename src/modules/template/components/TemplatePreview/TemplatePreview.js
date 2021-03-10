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
import getShouldNotShowPaymentMethod from './handlers/getShouldNotShowPaymentMethod';
import getShouldShowBankDepositPayment from './handlers/getShouldShowBankDepositPayment';
import getShouldShowChequePayment from './handlers/getShouldShowChequePayment';
import getShouldShowDueDate from './handlers/getShouldShowDueDate';
import getShouldShowOnlinePayment from './handlers/getShouldShowOnlinePayment';
import styles from './TemplatePreview.module.css';

const getDocInfoForPreviewType = (type, gstRegistered) => {
  switch (type) {
    case PreviewType.Invoice:
      return <InvoiceDocumentInfo gstRegistered={gstRegistered} />;
    case PreviewType.Quote:
      return <QuoteDocumentInfo />;
    case PreviewType.Statement:
    default:
      return <StatementDocumentInfo />;
  }
};

const getTemplateTable = (
  previewType,
  saleLayout,
  region,
  shouldShowTaxCodeAndAmount
) => {
  if (previewType === PreviewType.Statement) {
    return <StatementTable />;
  }
  if (saleLayout === SaleLayout.ItemAndService) {
    return (
      <ServiceItemTable
        region={region}
        shouldShowTaxCodeAndAmount={shouldShowTaxCodeAndAmount}
      />
    );
  }
  return (
    <ServiceTable
      region={region}
      shouldShowTaxCodeAndAmount={shouldShowTaxCodeAndAmount}
    />
  );
};

const getTemplateTableSummary = (
  previewType,
  saleLayout,
  region,
  shouldShowTaxCodeAndAmount
) => {
  switch (previewType) {
    case PreviewType.Statement:
      return <StatementTableSummary />;
    case PreviewType.Quote:
      return saleLayout === SaleLayout.Service ? (
        <QuoteServiceSummary
          region={region}
          shouldShowTaxCodeAndAmount={shouldShowTaxCodeAndAmount}
        />
      ) : (
        <QuoteServiceItemSummary
          region={region}
          shouldShowTaxCodeAndAmount={shouldShowTaxCodeAndAmount}
        />
      );
    case PreviewType.Invoice:
    default:
      // eslint-disable-next-line no-case-declarations
      const { subtotal, tax, total } = shouldShowTaxCodeAndAmount
        ? { subtotal: '$89.14', tax: '$8.91', total: '$98.05' }
        : { subtotal: '$98.05', tax: '$0.00', total: '$98.05' };
      return saleLayout === SaleLayout.Service ? (
        <InvoiceServiceSummary
          region={region}
          shouldShowTaxCodeAndAmount={shouldShowTaxCodeAndAmount}
        />
      ) : (
        <InvoiceServiceItemSummary
          region={region}
          description={
            <>
              <p>
                This is a sample
                <br />
                Thanks for doing business with Paradise Closet! We appreciate
                you shopping with us. For payment plans and full terms and
                conditions, please send an email to paradisecloset@myob.com
              </p>
            </>
          }
          subtotalAmount={subtotal}
          taxAmount={tax}
          totalAmount={total}
          totalPaid="$0.00"
          balanceDue="$98.05"
        />
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
    previewType,
    isAllowPaymentByDirectDeposit,
  });
  const shouldShowChequePayment = getShouldShowChequePayment({
    previewType,
    isAllowPaymentByCheque,
  });
  const shouldShowDueDate = getShouldShowDueDate(previewType);

  const auPayments = {
    bPay: shouldShowOnlinePayment ? (
      <BpayPayment
        isLoading={isOnlinePaymentLoading}
        isShown={isAllowOnlinePayment}
      />
    ) : undefined,
    creditCard: shouldShowOnlinePayment ? (
      <CreditCardPayment
        isLoading={isOnlinePaymentLoading}
        isShown={isAllowOnlinePayment}
      />
    ) : undefined,
    bankDeposit: shouldShowBankDepositPayment ? (
      <AUBankDepositPayment />
    ) : undefined,
    cheque: shouldShowChequePayment ? <AUChequePayment /> : undefined,
  };
  const nzPayments = {
    bankDeposit: shouldShowBankDepositPayment ? (
      <NZBankDepositPayment />
    ) : undefined,
    cheque: shouldShowChequePayment ? <NZChequePayment /> : undefined,
  };

  const dueDate = shouldShowDueDate ? (
    <span>Due date: {formatSlashDate(addMonths(Date.now(), 1))}</span>
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
  gstRegistered,
  gstNumber,
  shouldShowTaxCodeAndAmount,
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
        gstNumber={gstNumber}
      />
      {getDocInfoForPreviewType(previewType, gstRegistered)}
      <ShippingInfo
        previewType={previewType}
        useAddressEnvelopePosition={useAddressEnvelopePosition}
      />
      <Separator featureColour={featureColour} />
      {getTemplateTable(
        previewType,
        saleLayout,
        region,
        shouldShowTaxCodeAndAmount
      )}
      {getTemplateTableSummary(
        previewType,
        saleLayout,
        region,
        shouldShowTaxCodeAndAmount
      )}
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
