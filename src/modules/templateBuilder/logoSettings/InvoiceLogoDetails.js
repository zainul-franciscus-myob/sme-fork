import React from 'react';

import InvoiceBusinessDetails from './InvoiceBusinessDetails';
import InvoiceLogoDetailsHeaderInformation from './InvoiceLogoDetailsHeaderInformation';

const InvoiceLogoDetails = ({ onFileRemoved, onFileSelected, onUpdateTemplateOptions }) => (
  <>
    <InvoiceBusinessDetails onUpdateTemplateOptions={onUpdateTemplateOptions} />
    <InvoiceLogoDetailsHeaderInformation
      onFileRemoved={onFileRemoved}
      onFileSelected={onFileSelected}
      onUpdateTemplateOptions={onUpdateTemplateOptions}
    />
  </>
);

export default InvoiceLogoDetails;
