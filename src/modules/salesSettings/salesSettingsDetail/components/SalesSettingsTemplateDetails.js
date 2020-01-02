import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasArlTemplates,
  getHasEssentialsTemplates,
} from '../SalesSettingsDetailSelectors';
import ArlTemplateTable from './templates/ArlTemplateTable';
import EssentialsTemplateTable from './templates/EssentialsTemplateTable';
import TemplatesTable from './templates/TemplateTable';
import styles from './SalesSettingsTemplateDetails.module.css';

const SalesSettingsTemplateDetails = ({
  hasArlTemplates,
  hasEssentialsTemplates,
  templateHandlers: { onCreateTemplate, onActionSelect, onSortTemplateList },
}) => {
  const actions = (
    <ButtonRow>
      <Button onClick={onCreateTemplate}>Create Template</Button>
    </ButtonRow>
  );
  return (
    <div className={styles.templateContainer}>
      {actions}
      <TemplatesTable
        onSortTemplateList={onSortTemplateList}
        onActionSelect={onActionSelect}
        onCreateTemplate={onCreateTemplate}
      />
      {hasArlTemplates && <ArlTemplateTable />}
      {hasEssentialsTemplates && (
        <EssentialsTemplateTable />
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  hasArlTemplates: getHasArlTemplates(state),
  hasEssentialsTemplates: getHasEssentialsTemplates(state),
});

export default connect(mapStateToProps)(SalesSettingsTemplateDetails);
