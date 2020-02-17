import { Card, Checkbox, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDefault, getTemplateName } from '../../template/templateSelectors';
import cardStyles from './cardStyles.module.css';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const InvoiceBusinessDetails = ({
  templateName,
  isDefault,
  onUpdateTemplateOptions,
}) => (
  <Card
    body={
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
    classes={cardStyles.card}
    header={<span className={cardStyles.title}>Set your template name</span>}
  />
);

const mapStateToProps = state => ({
  templateName: getTemplateName(state),
  isDefault: getIsDefault(state),
});

export default connect(mapStateToProps)(InvoiceBusinessDetails);
