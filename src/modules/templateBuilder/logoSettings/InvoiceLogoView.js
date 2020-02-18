import {
  Alert,
  Button,
  PageHead,
  StickyHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getBusinessDetailsOptionsForDisplay,
  getFeatureColour,
  getHeaderBusinessDetailsStyle,
  getHeaderImage,
  getHeaderTextColour,
  getIsAllowOnlinePayment,
  getIsAllowPaymentByCheque,
  getIsAllowPaymentByDirectDeposit,
  getIsCreating,
  getIsLoading,
  getIsLogoOnTheLeft,
  getIsOnlinePaymentLoading,
  getLogoImage,
  getLogoSize,
  getModalType,
  getPreviewType,
  getRegion,
  getSaleLayout,
  getUseAddressEnvelopePosition,
} from '../../template/templateSelectors';
import InvoiceLogoDetails from './InvoiceLogoDetails';
import InvoiceTemplatePreview from './InvoiceTemplatePreview';
import PageView from '../../../components/PageView/PageView';
import PreviewTemplate from '../../../components/PreviewTemplate/PreviewTemplate';
import TemplateModal from '../../template/components/TemplateModal';
import styles from '../../template/components/TemplatePreviewHeader.module.css';

const InvoiceLogoView = ({
  alert,
  businessDetails: {
    abn,
    businessName,
    email,
    phoneNumber,
    streetAddress,
    tradingName,
    website,
  },
  featureColour,
  headerBusinessDetailsStyle,
  headerImage,
  headerTextColour,
  isAllowOnlinePayment,
  isAllowPaymentByCheque,
  isAllowPaymentByDirectDeposit,
  isCreating,
  isLoading,
  isLogoOnTheLeft,
  isOnlinePaymentLoading,
  logoImage,
  logoSize,
  modalType,
  onCloseModal,
  onConfirmSave,
  onConfirmUnsave,
  onDismissAlert,
  onFileRemoved,
  onFileSelected,
  onSave,
  onUpdateTemplateOptions,
  previewType,
  region,
  saleLayout,
  useAddressEnvelopePosition,
}) => {
  const pageTitle = isCreating ? 'Build your invoice template' : 'Edit your invoice template';

  const pageHead = (
    <StickyHeader>
      <PageHead title={pageTitle}>
        <Button onClick={onSave}>Next</Button>
      </PageHead>
    </StickyHeader>
  );

  const previewHeader = (
    <div className={styles.header}>
      <span className={styles.headerTitle}>Template preview</span>
    </div>
  );

  const preview = (
    <InvoiceTemplatePreview
      abn={abn}
      businessName={businessName}
      email={email}
      featureColour={featureColour}
      headerBusinessDetailsStyle={headerBusinessDetailsStyle}
      headerImage={headerImage}
      headerTextColour={headerTextColour}
      isAllowOnlinePayment={isAllowOnlinePayment}
      isAllowPaymentByCheque={isAllowPaymentByCheque}
      isAllowPaymentByDirectDeposit={isAllowPaymentByDirectDeposit}
      isLogoOnTheLeft={isLogoOnTheLeft}
      isOnlinePaymentLoading={isOnlinePaymentLoading}
      logoImage={logoImage}
      logoSize={logoSize}
      phoneNumber={phoneNumber}
      previewType={previewType}
      region={region}
      saleLayout={saleLayout}
      streetAddress={streetAddress}
      tradingName={tradingName}
      useAddressEnvelopePosition={useAddressEnvelopePosition}
      website={website}
    />
  );

  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const previewOriginalWidth = 700;
  const previewRatio = 1.414;

  const view = (
    <>
      {modalType && (
        <TemplateModal
          onCloseModal={onCloseModal}
          onConfirmSave={onConfirmSave}
          onConfirmUnsave={onConfirmUnsave}
          type={modalType}
        />
      )}

      <PreviewTemplate
        alert={alertComponent}
        details={(
          <InvoiceLogoDetails
            onFileRemoved={onFileRemoved}
            onFileSelected={onFileSelected}
            onUpdateTemplateOptions={onUpdateTemplateOptions}
          />
        )}
        pageHead={pageHead}
        preview={preview}
        previewHeader={previewHeader}
        previewOriginalWidth={previewOriginalWidth}
        previewRatio={previewRatio}
      />
    </>
  );

  return <PageView view={view} isLoading={isLoading} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  businessDetails: getBusinessDetailsOptionsForDisplay(state),
  featureColour: getFeatureColour(state),
  headerBusinessDetailsStyle: getHeaderBusinessDetailsStyle(state),
  headerImage: getHeaderImage(state),
  headerTextColour: getHeaderTextColour(state),
  isAllowOnlinePayment: getIsAllowOnlinePayment(state),
  isAllowPaymentByCheque: getIsAllowPaymentByCheque(state),
  isAllowPaymentByDirectDeposit: getIsAllowPaymentByDirectDeposit(state),
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  isLogoOnTheLeft: getIsLogoOnTheLeft(state),
  isOnlinePaymentLoading: getIsOnlinePaymentLoading(state),
  logoImage: getLogoImage(state),
  logoSize: getLogoSize(state),
  modalType: getModalType(state),
  previewType: getPreviewType(state),
  region: getRegion(state),
  saleLayout: getSaleLayout(state),
  useAddressEnvelopePosition: getUseAddressEnvelopePosition(state),
});

export default connect(mapStateToProps)(InvoiceLogoView);
