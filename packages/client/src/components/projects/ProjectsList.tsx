import { Project } from "../../types/projectTypes";
import ProjectComponent from "./ProjectCard";

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
      {projects && projects.length === 0 && <div>No projects exist. Why not make one?</div>}
    </div>
  );
};

export default ProjectList;
