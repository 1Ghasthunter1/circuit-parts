import { Project } from "../../types/projectTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "react-query";
import { deleteProjectById } from "../../services/projectsServices";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import DeleteModal from "../modals/DeleteModal";
import Button from "../../elements/Button";

Modal.setAppElement("#root");

interface ProjectTypes {
  project: Project;
}

const ProjectCard = ({ project }: ProjectTypes) => {
  const queryClient = useQueryClient();
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);

  console.log(deleteModalVis);

  const deleteProject = async (projectId: string) => {
    await deleteProjectById(projectId);
    await queryClient.invalidateQueries("projects");
    setDeleteModalVis(true);
  };

  const DeleteForm = () => {
    return (
      <div>
        <div className="pb-4 text-xl">
          Confirm deletion of the following project:{" "}
        </div>
        <div>Project Name: {project.name}</div>
        <div className="pb-4">Project Prefix: {project.prefix}</div>
        <Button
          bgColor="bg-red-600"
          txtColor="text-white"
          className="float-right"
          onClick={(e) => {
            e.preventDefault();
            void deleteProject(project.id);
          }}
        >
          Delete
        </Button>
      </div>
    );
  };

  return (
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
            e.stopPropagation();
            setDeleteModalVis(true);
          }}
          className="hidden transition group-hover:block ml-auto mt-auto items-bottom p-1 z-50"
        >
          <FontAwesomeIcon icon="trash" color="#c70404" />
        </div>
        <div className="z-50">
          <Modal
            isOpen={deleteModalVis}
            onRequestClose={(e) => {
              console.log("here");
              e.stopPropagation();
              setDeleteModalVis(false);
            }}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: { backgroundColor: `rgba(0,0,0,0)` },
              content: { backgroundColor: `rgba(0,0,0,0)`, border: 0 },
            }}
          >
            <DeleteModal
              component={project}
              closeModal={() => setDeleteModalVis(false)}
            />
          </Modal>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
