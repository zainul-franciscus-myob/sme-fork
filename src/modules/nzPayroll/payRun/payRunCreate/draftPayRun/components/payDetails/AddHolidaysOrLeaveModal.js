import './AddHolidaysOrLeaveModal.css';
import {
  Button,
  ButtonRow,
  FieldGroup,
  Heading,
  Modal,
  Select,
  SubHeadingGroup,
} from '@myob/myob-widgets';
import React from 'react';

const AddHolidaysOrLeaveModal = ({ onCancel, onContinue }) => (
  <Modal title="Add holidays or leave" size="large" onCancel={onCancel}>
    <Modal.Body>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto max-content',
          gridColumnGap: '100px',
        }}
      >
        <SubHeadingGroup
          subHeading={
            <Heading variant="lg" textAlign="left" flex="1">
              Enter Details
            </Heading>
          }
        >
          <div style={{ width: '200px' }}>
            <Select name="Reason" label="Reason">
              <Select.Option value="" label="Please select an option" />
            </Select>
          </div>
        </SubHeadingGroup>
      </div>
      <FieldGroup></FieldGroup>
    </Modal.Body>
    <div className="holidays__modal__footer">
      <ButtonRow
        secondary={[
          <Button type="secondary" onClick={onCancel}>
            Cancel
          </Button>,
        ]}
        primary={[<Button onClick={onContinue}>Continue</Button>]}
      ></ButtonRow>
    </div>
  </Modal>
);

export default AddHolidaysOrLeaveModal;
