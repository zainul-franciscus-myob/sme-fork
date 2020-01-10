import { Checkbox, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDefault, getTemplateName } from '../templateSelectors';
import Collapsible from './Collapsible';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const TemplateDetailsOptions = ({
  templateName,
  isDefault,
  onUpdateTemplateOptions,
}) => (
  <Collapsible
    title="Template options"
    visible
    content={
      <>
        <Input
          name="templateName"
          label="Name"
          value={templateName}
          requiredLabel="This field is required"
          onChange={handleInputChange(onUpdateTemplateOptions)}
        />
        <Checkbox
          name="isDefault"
          label="Set as default template"
          onChange={handleCheckboxChange(onUpdateTemplateOptions)}
          checked={isDefault}
        />
      </>
    }
  />
);

const mapStateToProps = state => ({
  templateName: getTemplateName(state),
  isDefault: getIsDefault(state),
});

export default connect(mapStateToProps)(TemplateDetailsOptions);
