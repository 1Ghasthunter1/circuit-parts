import Modal from "react-modal";
interface PropTypes {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  children: JSX.Element;
}
const BaseModal = ({
  modalVisibility,
  setModalVisibility,
  children,
}: PropTypes) => {
  return (
    <Modal
      isOpen={modalVisibility}
      onRequestClose={() => {
        setModalVisibility(false);
      }}
      style={{
        overlay: {
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `rgba(0,0,0,0.2)`,
        },
        content: {
          position: "absolute",
          top: "40%",
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0,0,0,0)",
          borderRadius: 0,
          padding: 0,
          width: "fit-content",
          height: "fit-content",
          border: 0,
        },
      }}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
