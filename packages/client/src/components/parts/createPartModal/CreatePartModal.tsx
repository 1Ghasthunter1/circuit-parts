import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../../../elements/Button";
import CreatePartForm from "./CreatePartForm";

const CreateProjectModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={(_e) => setShowModal(true)}
      >
        New Part
      </Button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white w-600 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">New Part</h3>
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
                <div className="relative p-6 flex-auto">
                  <CreatePartForm closeModal={() => setShowModal(false)} />
                </div>
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

export default CreateProjectModal;
