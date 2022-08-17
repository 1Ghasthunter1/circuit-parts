import { Project } from "../../types/projectTypes";
import ProjectComponent from "./Project";

interface ProjectListProps {
  projects: Project[] | undefined;
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div>
      <ol>
        {projects &&
          projects.map((project) => (
            <li key={project.id}>
              <ProjectComponent project={project} />
            </li>
          ))}{" "}
      </ol>
    </div>
  );
};

export default ProjectList;
