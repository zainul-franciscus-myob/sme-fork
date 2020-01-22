import React from 'react';

import { PreviewType, SaleLayout } from '../../templateOptions';
import AUPaymentMethod from './PaymentMethod/AUPaymentMethod';
import InvoiceDocumentInfo from './documentInfo/InvoiceDocumentInfo';
import InvoiceFooter from './footer/InvoiceFooter';
import InvoiceServiceItemSummary from './tableSummary/InvoiceServiceItemSummary';
import InvoiceServiceSummary from './tableSummary/InvoiceServiceSummary';
import NZPaymentMethod from './PaymentMethod/NZPaymentMethod';
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
  const isQuote = previewType === PreviewType.Quote;
  const isEmptyAU = region === 'au'
    && !(isAllowOnlinePayment
      || isAllowPaymentByDirectDeposit
      || isAllowPaymentByCheque);
  const isEmptyNZ = region === 'nz'
    && !(isAllowPaymentByDirectDeposit || isAllowPaymentByCheque);
  if (isQuote || isEmptyNZ || isEmptyAU) {
    return false;
  }
  if (region === 'au') {
    return (
      <AUPaymentMethod
        previewType={previewType}
        isAllowOnlinePayment={isAllowOnlinePayment}
        isAllowPaymentByDirectDeposit={isAllowPaymentByDirectDeposit}
        isAllowPaymentByCheque={isAllowPaymentByCheque}
      />
    );
  }
  return (
    <NZPaymentMethod
      previewType={previewType}
      isAllowPaymentByDirectDeposit={isAllowPaymentByDirectDeposit}
      isAllowPaymentByCheque={isAllowPaymentByCheque}
    />
  );
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
