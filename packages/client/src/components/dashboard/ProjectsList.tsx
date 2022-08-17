import { Project } from "../../types/projectTypes";

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
              {project.name} {project.prefix}
            </li>
          ))}{" "}
      </ol>
    </div>
  );
};

export default ProjectList;
