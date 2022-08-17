import { Project } from "../../types/projectTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProjectTypes {
  project: Project;
}

const ProjectComponent = ({ project }: ProjectTypes) => {
  return (
    <div className="group flex flex-row items-center transition bg-gray-200 my-2 p-4 rounded-md hover:bg-gray-300 hover:scale-105">
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
      <div className="hidden transition group-hover:block ml-auto mt-auto items-bottom p-1">
        <FontAwesomeIcon icon="trash" color="#c70404" />
      </div>
    </div>
  );
};

export default ProjectComponent;
