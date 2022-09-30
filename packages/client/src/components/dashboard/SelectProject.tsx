import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { fetchProjects } from "~/services/projectsServices";
import { Project } from "~/types/projectTypes";

const SelectProject = ({
  projectId,
  setProjectId,
}: {
  projectId: string;
  setProjectId: Dispatch<SetStateAction<string>>;
}) => {
  const { data, isLoading } = useQuery<Project[]>("projects", fetchProjects);

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Select Project
      </label>
      <select
        className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        name="project"
        placeholder="Oompa Loompa Project"
        onChange={(e) => setProjectId(e.target.value)}
      >
        {data ? (
          data.map((project) => (
            <option value={project.id} key={project.id}>
              {project.name}
            </option>
          ))
        ) : (
          <option>loading</option>
        )}
      </select>
    </>
  );
};

export default SelectProject;
