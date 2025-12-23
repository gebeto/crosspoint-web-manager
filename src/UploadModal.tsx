export const UploadModal = () => {
  const closeUploadModal = () => {};
  const uploadFile = () => {};
  const validateFile = () => {};

  return (
    <div className="modal-overlay" id="uploadModal">
      <div className="modal">
        <button className="modal-close" onClick={closeUploadModal}>
          &times;
        </button>
        <h3>📤 Upload file</h3>
        <div className="upload-form">
          <p className="file-info">
            Select a file to upload to <strong id="uploadPathDisplay"></strong>
          </p>
          <input type="file" id="fileInput" onChange={validateFile} />
          <button
            id="uploadBtn"
            className="upload-btn"
            onClick={uploadFile}
            disabled
          >
            Upload
          </button>
          <div id="progress-container">
            <div id="progress-bar">
              <div id="progress-fill"></div>
            </div>
            <div id="progress-text"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
