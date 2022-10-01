import { Project } from "../../types/projectTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "react-query";
import { deleteProjectById } from "../../services/projectsServices";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import DeleteModal from "../modals/DeleteModal";

import { userState } from "../../state/state";
import { useSnapshot } from "valtio";
import { validatePerms } from "~/services/usersService";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

interface ProjectTypes {
  project: Project;
}

const ProjectCard = ({ project }: ProjectTypes) => {
  const user = useSnapshot(userState).user;
  const queryClient = useQueryClient();
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);

  const mutation = useMutation(
    async () => await deleteProjectById(project.id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("projects");
        toast.success(`Deleted project ${project.name}`);
      },
    }
  );

  return (
    <>
      <Link to={`/projects/${project.id}`}>
        <div className="h-24 group flex flex-row items-center shadow transition bg-white my-2 p-4 rounded-md hover:bg-gray-50 hover:scale-102">
          <div className="inline-block align-middle float-left p-1 mx-4">
            <FontAwesomeIcon icon="folder-open" size="2x" color="#EE3D96" />
          </div>
          <div className="inline-block float-left">
            <p className="text-xl font-bold">{project.name}</p>
            <p className="text-sm text-gray-400">
              <b>{project.prefix}</b>
            </p>
            <p className="text-sm text-gray-400">{project.description}</p>
          </div>
          {validatePerms(["admin", "owner"], user?.role) && (
            <div
              onClick={(e) => {
                e.preventDefault();
                setDeleteModalVis(true);
              }}
              className="hidden transition group-hover:block ml-auto mt-auto items-bottom p-1 z-50"
            >
              <FontAwesomeIcon icon="trash" color="#c70404" />
            </div>
          )}
          <div className="z-50"></div>
        </div>
      </Link>
      <Modal
        isOpen={deleteModalVis}
        onRequestClose={() => {
          setDeleteModalVis(false);
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
        <DeleteModal
          component={project}
          setModalVisibility={() => setDeleteModalVis(false)}
          modalVisibility={deleteModalVis}
          deleteMutation={mutation}
          serious={true}
        />
      </Modal>
    </>
  );
};

export default ProjectCard;
