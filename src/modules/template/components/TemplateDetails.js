import React from 'react';

import TemplateDetailsHeaderInformation from './TemplateDetailsHeaderInformation';
import TemplateDetailsHeaderStyle from './TemplateDetailsHeaderStyle';
import TemplateDetailsOptions from './TemplateDetailsOptions';

const TemplateDetails = ({
  onUpdateTemplateOptions,
  onFileSelected,
  onFileRemoved,
  onEditBusinessDetails,
}) => (
  <>
    <TemplateDetailsOptions onUpdateTemplateOptions={onUpdateTemplateOptions} />
    <TemplateDetailsHeaderStyle
      onUpdateTemplateOptions={onUpdateTemplateOptions}
    />
    <TemplateDetailsHeaderInformation
      onUpdateTemplateOptions={onUpdateTemplateOptions}
      onFileSelected={onFileSelected}
      onFileRemoved={onFileRemoved}
      onEditBusinessDetails={onEditBusinessDetails}
    />
  </>
);

export default TemplateDetails;
