import { Button, Card, FieldGroup, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldDisplayCustomTemplateList,
  getTemplateList,
} from '../purchaseSettingsSelector';

const PurchaseSettingsTemplateDetails = ({
  exportPdf,
  templateList,
  shouldDisplayCustomTemplateList,
}) => {
  const templateRows = templateList.map((template) => (
    <Table.Row>
      <Table.RowItem>{template.name}</Table.RowItem>
    </Table.Row>
  ));

  if (shouldDisplayCustomTemplateList)
    return (
      <Card>
        <FieldGroup label="MYOB AccountRight desktop templates">
          {
            "You can still use templates created in the desktop version of AccountRight. To edit these templates, you'll need to open them in the desktop version of AccountRight."
          }
        </FieldGroup>
        <Table>
          <Table.Header>
            <Table.HeaderItem>Name</Table.HeaderItem>
          </Table.Header>
          {templateRows}
        </Table>
      </Card>
    );
  return (
    <Card>
      <FieldGroup label="Preview remittance advice">
        {'Preview the remittance advice PDF that gets sent to your payees.'}
      </FieldGroup>
      <br />
      <Button type="link" onClick={exportPdf}>
        Download preview (PDF)
      </Button>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  templateList: getTemplateList(state),
  shouldDisplayCustomTemplateList: getShouldDisplayCustomTemplateList(state),
});

export default connect(mapStateToProps)(PurchaseSettingsTemplateDetails);
