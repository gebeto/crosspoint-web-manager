import { Modal } from "./Modal";

export const UploadModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const uploadFile = () => {};
  const validateFile = () => {};

  return (
    <Modal open={open} onClose={onClose} title="📤 Upload file">
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
    </Modal>
  );
};
