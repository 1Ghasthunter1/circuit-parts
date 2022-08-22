import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const TestThing = () => {
  const [vis, setVis] = useState<boolean>(false);
  return (
    <>
      <Link to="/projects/123">
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setVis(true);
          }}
        >
          This is supposed to show!~
        </div>
      </Link>
      <Modal
        isOpen={vis}
        onRequestClose={() => {
          setVis(false);
        }}
        shouldCloseOnOverlayClick={true}
      >
        <p>Content</p>
      </Modal>
    </>
  );
};

export default TestThing;
