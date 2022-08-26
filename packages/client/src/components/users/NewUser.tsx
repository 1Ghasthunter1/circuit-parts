import Button from "../../elements/Button";
import { useState } from "react";
import NewUserModal from "../modals/NewUserModal";
const NewUser = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  console.log(showModal);
  return (
    <>
      <Button
        iconName="user"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={(_e) => setShowModal(true)}
      >
        New User
      </Button>
      <NewUserModal
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </>
  );
};

export default NewUser;
