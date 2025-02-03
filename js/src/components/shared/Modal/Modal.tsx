import Modal from "react-modal";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { ReactNode } from "react";

Modal.setAppElement("#root");

type MainModalProps = {
  show: boolean;
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  onClose: () => void;
};

const MainModal = ({
  show,
  title,
  children,
  onSubmit,
  onClose,
}: MainModalProps) => {
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "800px",
      margin: "auto",
    },
  };

  return (
    <>
      <Modal
        isOpen={show}
        style={modalStyles}
        onAfterOpen={() => {}}
        onRequestClose={onClose}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
          </div>
          <div className={styles.modalContent}>{children}</div>
          <div className={styles.modalFooter}>
            <button
              className={classNames(
                styles.modalMainButtons,
                styles.buttonSecondary
              )}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={classNames(
                styles.modalMainButtons,
                styles.buttonPrimary
              )}
              onClick={onSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MainModal;
