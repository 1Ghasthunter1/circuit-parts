import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface CreateModalProps {
  title: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  form: JSX.Element;
}

const CreateModal = ({
  title,
  showModal,
  setShowModal,
  form,
}: CreateModalProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white w-600 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <button
                    className="p-1 bg-transparent border-0 float-rightleading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <FontAwesomeIcon
                      icon="square-xmark"
                      color="red"
                      size="2x"
                    />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{form}</div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateModal;
