import { Alert, Button, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getBusinessDetailsOptionsForDisplay,
  getFeatureColour,
  getGstRegistered,
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
  getShouldShowTaxCodeAndAmount,
  getUseAddressEnvelopePosition,
} from '../templateSelectors';
import PageView from '../../../components/PageView/PageView';
import PreviewTemplate from '../../../components/PreviewTemplate/PreviewTemplate';
import StickyHeader from '../../../components/Feelix/StickyHeader/StickyHeader';
import TemplateDetails from './TemplateDetails';
import TemplateModal from './TemplateModal';
import TemplatePreview from './TemplatePreview/TemplatePreview';
import TemplatePreviewHeader from './TemplatePreviewHeader';

const TemplateView = ({
  onUpdateTemplateOptions,
  onFileSelected,
  onFileRemoved,
  featureColour,
  headerTextColour,
  useAddressEnvelopePosition,
  isLogoOnTheLeft,
  headerBusinessDetailsStyle,
  logoImage,
  logoSize,
  headerImage,
  onSave,
  isLoading,
  businessDetails: {
    businessName,
    tradingName,
    streetAddress,
    phoneNumber,
    email,
    website,
    abn,
    gstNumber,
  },
  previewType,
  saleLayout,
  onPreviewTypeChange,
  onDismissAlert,
  onConfirmUnsave,
  onConfirmSave,
  onCloseModal,
  onEditBusinessDetails,
  onCancel,
  alert,
  modalType,
  region,
  isCreating,
  isOnlinePaymentLoading,
  isAllowOnlinePayment,
  isAllowPaymentByDirectDeposit,
  isAllowPaymentByCheque,
  gstRegistered,
  shouldShowTaxCodeAndAmount,
}) => {
  const pageTitle = isCreating ? 'Create template' : 'Edit template';
  const pageHead = (
    <StickyHeader>
      <PageHead title={pageTitle}>
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </PageHead>
    </StickyHeader>
  );
  const previewHeader = (
    <TemplatePreviewHeader onPreviewTypeChange={onPreviewTypeChange} />
  );
  const preview = (
    <TemplatePreview
      featureColour={featureColour}
      headerTextColour={headerTextColour}
      useAddressEnvelopePosition={useAddressEnvelopePosition}
      isLogoOnTheLeft={isLogoOnTheLeft}
      headerBusinessDetailsStyle={headerBusinessDetailsStyle}
      logoImage={logoImage}
      logoSize={logoSize}
      headerImage={headerImage}
      previewType={previewType}
      saleLayout={saleLayout}
      region={region}
      businessName={businessName}
      tradingName={tradingName}
      streetAddress={streetAddress}
      phoneNumber={phoneNumber}
      email={email}
      website={website}
      abn={abn}
      isOnlinePaymentLoading={isOnlinePaymentLoading}
      isAllowOnlinePayment={isAllowOnlinePayment}
      isAllowPaymentByDirectDeposit={isAllowPaymentByDirectDeposit}
      isAllowPaymentByCheque={isAllowPaymentByCheque}
      gstRegistered={gstRegistered}
      gstNumber={gstNumber}
      shouldShowTaxCodeAndAmount={shouldShowTaxCodeAndAmount}
    />
  );

  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  // Template preview layout is designed in relation to a canvas of 688 pixel wide
  const previewOriginalWidth = 700;
  // Template preview suppose to be A4, which is represent by ratio of 1.41
  const previewRatio = 1.414;

  const view = (
    <>
      {modalType && (
        <TemplateModal
          type={modalType}
          onConfirmUnsave={onConfirmUnsave}
          onConfirmSave={onConfirmSave}
          onCloseModal={onCloseModal}
        />
      )}
      <PreviewTemplate
        alert={alertComponent}
        pageHead={pageHead}
        details={
          <TemplateDetails
            onUpdateTemplateOptions={onUpdateTemplateOptions}
            onFileSelected={onFileSelected}
            onFileRemoved={onFileRemoved}
            onEditBusinessDetails={onEditBusinessDetails}
          />
        }
        preview={preview}
        previewHeader={previewHeader}
        previewOriginalWidth={previewOriginalWidth}
        previewRatio={previewRatio}
      />
    </>
  );
  return <PageView view={view} isLoading={isLoading} />;
};

const mapStateToProps = (state) => ({
  featureColour: getFeatureColour(state),
  headerTextColour: getHeaderTextColour(state),
  useAddressEnvelopePosition: getUseAddressEnvelopePosition(state),
  isLogoOnTheLeft: getIsLogoOnTheLeft(state),
  headerBusinessDetailsStyle: getHeaderBusinessDetailsStyle(state),
  logoImage: getLogoImage(state),
  logoSize: getLogoSize(state),
  headerImage: getHeaderImage(state),
  isLoading: getIsLoading(state),
  previewType: getPreviewType(state),
  saleLayout: getSaleLayout(state),
  businessDetails: getBusinessDetailsOptionsForDisplay(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  region: getRegion(state),
  isCreating: getIsCreating(state),
  isOnlinePaymentLoading: getIsOnlinePaymentLoading(state),
  isAllowOnlinePayment: getIsAllowOnlinePayment(state),
  isAllowPaymentByDirectDeposit: getIsAllowPaymentByDirectDeposit(state),
  isAllowPaymentByCheque: getIsAllowPaymentByCheque(state),
  gstRegistered: getGstRegistered(state),
  shouldShowTaxCodeAndAmount: getShouldShowTaxCodeAndAmount(state),
});

export default connect(mapStateToProps)(TemplateView);
