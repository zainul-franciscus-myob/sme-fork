import {
  Aside,
  Button,
  ButtonRow,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  Icons,
  Search,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveEntry } from '../selectors/InTrayListSelectors';
import actionTypes from '../actionTypes';


const items = [
  <Dropdown.Item
    key={actionTypes.createBill}
    label="Create bill"
    value={actionTypes.createBill}
  />,
];

const InTrayListDetail = ({
  onClose, handleActionSelect, activeEntryId, uploadedDate,
}) => (
  <Aside
    header={(
      <Aside.Header>
        <Aside.Title icon={<Icons.Invoice set="lg" />}>
            Document uploaded
          {' '}
          {uploadedDate}
        </Aside.Title>
        <Aside.Button onClick={onClose} icon={<Icons.Close />} />
      </Aside.Header>
    )}
    footer={(
      <ButtonRow>
        <Button
          type="secondary"
          onClick={() => handleActionSelect(activeEntryId)(actionTypes.linkToExistingBill)}
        >
          Link to existing bill
        </Button>
        <Dropdown
          top
          right
          onSelect={handleActionSelect(activeEntryId)}
          toggle={(
            <Dropdown.Toggle>
              Create
              <Icons.Caret />
            </Dropdown.Toggle>
          )}
          items={items}
        />
      </ButtonRow>
)}
  >
    <Search label="Clients" name="Clients" onChange={() => {}} />
    <CheckboxGroup
      label="Colors:"
      renderCheckbox={props => (
        <React.Fragment>
          <Checkbox {...props} label="Red" name="red" />
          <Checkbox {...props} label="Yellow" name="yello" />
        </React.Fragment>
      )}
    />
  </Aside>
);

const mapStateToProps = state => ({
  ...getActiveEntry(state),
});

export default connect(mapStateToProps)(InTrayListDetail);
