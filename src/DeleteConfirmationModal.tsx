export const DeleteConfirmationModal = () => {
  const closeDeleteModal = () => {};
  const confirmDelete = () => {};

  return (
    <div className="modal-overlay" id="deleteModal">
      <div className="modal">
        <button className="modal-close" onClick={closeDeleteModal}>
          &times;
        </button>
        <h3>🗑️ Delete Item</h3>
        <div className="folder-form">
          <p className="delete-warning">⚠️ This action cannot be undone!</p>
          <p className="file-info">Are you sure you want to delete:</p>
          <p className="delete-item-name" id="deleteItemName"></p>
          <input type="hidden" id="deleteItemPath" />
          <input type="hidden" id="deleteItemType" />
          <button className="delete-btn-confirm" onClick={confirmDelete}>
            Delete
          </button>
          <button className="delete-btn-cancel" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
