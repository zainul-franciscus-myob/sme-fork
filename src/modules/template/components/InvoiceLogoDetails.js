import React from 'react';

import InvoiceLogoDetailsHeaderInformation from './InvoiceLogoDetailsHeaderInformation';

const InvoiceLogoDetails = ({ onFileRemoved, onFileSelected, onUpdateTemplateOptions }) => (
  <InvoiceLogoDetailsHeaderInformation
    onFileRemoved={onFileRemoved}
    onFileSelected={onFileSelected}
    onUpdateTemplateOptions={onUpdateTemplateOptions}
  />
);

export default InvoiceLogoDetails;
