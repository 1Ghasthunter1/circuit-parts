import { useParams } from "react-router";
import { useQuery } from "react-query";

import {
  fetchProject,
  fetchProjectComponents,
} from "../services/projectsServices";

import TopLeftRightAndMiddle from "../layouts/TopLeftRightAndMiddle";
import NewComponentButtons from "../components/components/NewComponentButtons";
import ComponentsTable from "~/components/components/ComponentsTable";
import TopLeftCenterSkeleton from "~/components/skeletons/TopLeftCenterSkeleton";

const ProjectView = () => {
  const { id } = useParams();

  if (!id) return null;

  const projectQuery = useQuery(`/projects/${id}`, () => fetchProject(id));
  const projectComponentsQuery = useQuery(`/projects/${id}/components`, () =>
    fetchProjectComponents(id)
  );
  const project = projectQuery.data;

  if (projectComponentsQuery.data && project) {
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
        <ComponentsTable
          data={projectComponentsQuery.data || []}
          queryKeyToRefresh={`/projects/${id}/components`}
        />
      </TopLeftRightAndMiddle>
    );
  }
  return (
    <div className="m-12">
      <TopLeftCenterSkeleton />
    </div>
  );
};

export default ProjectView;
