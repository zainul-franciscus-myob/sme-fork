import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import Popover from '../../../components/Feelix/Popover/Popover';

const DeleteButtonWithPopover = ({
  onDelete,
  title,
  bodyText,
  isOpen,
  onCancel,
  openHandler,
}) => {
  const Header = () => (
    <Popover.Header child={<h4>{title}</h4>} />
  );

  const Body = () => (
    <Popover.Body child={<p>{bodyText}</p>} />
  );

  const footer = (
    <ButtonRow>
      <Button
        key="cancel"
        type="secondary"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        key="delete"
        type="delete"
        onClick={onDelete}
      >
        Delete
      </Button>
    </ButtonRow>
  );

  return (
    <Popover
      isOpen={isOpen}
      header={<Header />}
      body={<Body />}
      footer={<Popover.Footer child={footer} />}
      preferPlace="above"
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          key="modal-go-delete-btn"
          id="modal-go-delete-btn"
          type="secondary"
          onClick={openHandler}
        >
          Delete
        </Button>
      </div>
    </Popover>
  );
};

export default DeleteButtonWithPopover;
