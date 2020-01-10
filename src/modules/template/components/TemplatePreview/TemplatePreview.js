import React from 'react';

import { PreviewType, SaleLayout } from '../../templateOptions';
import InvoiceDocumentInfo from './documentInfo/InvoiceDocumentInfo';
import InvoiceFooter from './footer/InvoiceFooter';
import InvoiceTableSummary from './tableSummary/InvoiceTableSummary';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import QuoteDocumentInfo from './documentInfo/QuoteDocumentInfo';
import QuoteFooter from './footer/QuoteFooter';
import QuoteTableSummary from './tableSummary/QuoteTableSummary';
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

const getTemplateTableSummary = (previewType, region) => {
  switch (previewType) {
    case PreviewType.Statement:
      return <StatementTableSummary />;
    case PreviewType.Quote:
      return <QuoteTableSummary region={region} />;
    case PreviewType.Invoice:
    default:
      return <InvoiceTableSummary region={region} />;
  }
};

const getTemplateFooter = (previewType) => {
  switch (previewType) {
    case PreviewType.Statement:
      return <StatementFooter />;
    case PreviewType.Quote:
      return <QuoteFooter />;
    case PreviewType.Invoice:
    default:
      return <InvoiceFooter />;
  }
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
      <ShippingInfo useAddressEnvelopePosition={useAddressEnvelopePosition} />
      <Separator featureColour={featureColour} />
      {getTemplateTable(previewType, saleLayout, region)}
      {getTemplateTableSummary(previewType, region)}
    </div>
    <div>
      <PaymentMethod />
      {getTemplateFooter(previewType)}
    </div>
  </div>
);

export default TemplatePreview;
