import React from 'react';

import DeleteModal from '../../../../components/modal/DeleteModal';

const onConfirmClick = (handler, entry) => () => {
  handler(entry);
};

const InTrayDeleteModal = ({
  entry,
  listeners: {
    onConfirmClose,
    onConfirmDelete,
  },
}) => (
  <DeleteModal
    onCancel={onConfirmClose}
    onConfirm={onConfirmClick(onConfirmDelete, entry)}
    title="Delete this document?"
  />
);

export default InTrayDeleteModal;
