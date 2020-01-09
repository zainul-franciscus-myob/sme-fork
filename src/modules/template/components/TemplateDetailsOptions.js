import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTemplateName } from '../templateSelectors';
import Collapsible from './Collapsible';
import handleInputChange from '../../../components/handlers/handleInputChange';

const TemplateDetailsOptions = ({
  templateName,
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
      </>
    }
  />
);

const mapStateToProps = state => ({
  templateName: getTemplateName(state),
});

export default connect(mapStateToProps)(TemplateDetailsOptions);
