import React from 'react';

import DeleteModal from '../../components/modal/DeleteModal';

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
    title="Delete document"
    description="Are you sure you want to delete this document?"
  />
);

export default InTrayDeleteModal;
