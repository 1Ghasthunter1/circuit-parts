import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import ProjectsDashboard from "~/components/dashboard/ProjectsDashboard";
import SelectProject from "~/components/dashboard/SelectProject";
import DashboardSkeleton from "~/components/skeletons/DashboardSkeleton";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchProjectComponents } from "~/services/projectsServices";
import { projectSelectState } from "~/state/state";

const DashboardView = () => {
  const projectSelectSnapshot = useSnapshot(projectSelectState);
  const projectId = projectSelectSnapshot.project;

  const projectComponentsQuery = useQuery(
    `/projects/${projectId}/components`,
    () => fetchProjectComponents(projectId),
    { enabled: projectId !== "" }
  );

  const data = projectComponentsQuery.data;

  const TopLeftContent = (
    <div className="flex-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-700">
        Dashboard for project selected at the right.
      </p>
    </div>
  );
  const TopRightContent = (
    <div className="w-[300px]">
      <SelectProject
        projectId={projectSelectSnapshot.project}
        setProjectId={(value) => (projectSelectState.project = value)}
      />
    </div>
  );
  return (
    <>
      <TopLeftRightAndMiddle
        topLeftContent={TopLeftContent}
        topRightContent={TopRightContent}
      >
        {projectId !== "" ? (
          !data ? (
            <DashboardSkeleton rowCount={4} />
          ) : (
            <ProjectsDashboard components={data} filter="nasd" />
          )
        ) : (
          <div>Please select a project above...</div>
        )}
      </TopLeftRightAndMiddle>
    </>
  );
};

export default DashboardView;
