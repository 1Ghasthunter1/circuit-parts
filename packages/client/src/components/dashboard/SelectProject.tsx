import { useQuery } from "react-query";
import { fetchProjects } from "~/services/projectsServices";
import { Project } from "~/types/projectTypes";

const SelectProject = ({
  project,
  setProject,
}: {
  project: Project | null;
  setProject: (project: Project) => void;
}) => {
  const { data, isLoading } = useQuery<Project[]>("projects", fetchProjects);

  const projects = data;

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Select Project
      </label>
      <select
        className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        name="project"
        placeholder="Oompa Loompa Project"
        onChange={(e) => {
          const foundProject = projects?.find(
            (project) => project.id === e.target.value
          );
          if (foundProject) setProject(foundProject);
        }}
        value={project?.id || ""}
      >
        <option disabled value="">
          (Select a project)
        </option>
        {projects ? (
          projects.map((project) => (
            <option value={project.id} key={project.id}>
              {project.name}
            </option>
          ))
        ) : (
          <option>Loading Projects...</option>
        )}
      </select>
    </>
  );
};

export default SelectProject;
