import { Project } from "../../types/projectTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "react-query";
import { deleteProjectById } from "../../services/projectsServices";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import DeleteModal from "../modals/DeleteModal";

Modal.setAppElement("#root");

interface ProjectTypes {
  project: Project;
}

const ProjectCard = ({ project }: ProjectTypes) => {
  const queryClient = useQueryClient();
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);

  const deleteProject = async (projectId: string) => {
    await deleteProjectById(projectId);
    await queryClient.invalidateQueries("projects");
    setDeleteModalVis(false);
  };

  return (
    <>
      <Link to={`/projects/${project.id}`}>
        <div className="group flex flex-row items-center transition bg-gray-200 my-2 p-4 rounded-md hover:bg-gray-300 hover:scale-102">
          <div className="h-full items-center float-left p-1 mx-4">
            <FontAwesomeIcon icon="folder-open" size="2x" color="#EE3D96" />
          </div>
          <div className="inline-block float-left">
            <p className="text-xl font-bold">{project.name}</p>
            <p className="text-xs text-gray-400 ">
              <b>{project.prefix}</b>
            </p>
            <p className="text-sm">{project.description}</p>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setDeleteModalVis(true);
            }}
            className="hidden transition group-hover:block ml-auto mt-auto items-bottom p-1 z-50"
          >
            <FontAwesomeIcon icon="trash" color="#c70404" />
          </div>
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
          closeModal={() => setDeleteModalVis(false)}
          onDelete={() => deleteProject(project.id)}
        />
      </Modal>
    </>
  );
};

export default ProjectCard;
