import { useParams } from "react-router";
import { useQuery } from "react-query";

import {
  fetchProject,
  fetchProjectComponents,
} from "../services/projectsServices";

import PartsTable from "../components/parts/PartsTable";
import TopLeftRightAndMiddle from "../layouts/TopLeftRightAndMiddle";
import NewComponentButtons from "../components/components/NewComponentButtons";

const ProjectView = () => {
  const { id } = useParams();

  if (!id) return null;

  const projectQuery = useQuery(`/projects/${id}`, () => fetchProject(id));
  const projectComponentsQuery = useQuery(`/projects/${id}/components`, () =>
    fetchProjectComponents(id)
  );

  const project = projectQuery.data;

  if (!project) return null;

  const topLeftStuff = (
    <>
      <div className="text-4xl font-bold pb-2">Project: {project.name}</div>
      <div className="text-gray-400">
        Prefix: <b>{project.prefix}</b>
      </div>
      <div className="text-gray-400">
        Creation Date:{" "}
        <b>{new Date(project.creationDate).toLocaleDateString("en-US")}</b>
      </div>
    </>
  );

  const topRightStuff = (
    <NewComponentButtons
      project={project}
      parent={project}
      queriesToInvalidate={[projectQuery, projectComponentsQuery]}
    />
  );

  return (
    <TopLeftRightAndMiddle
      topLeftContent={topLeftStuff}
      topRightContent={topRightStuff}
    >
      <PartsTable
        data={projectComponentsQuery.data || []}
        queryKeyToRefresh={`/projects/${id}/components`}
      />
    </TopLeftRightAndMiddle>
  );
};

export default ProjectView;
