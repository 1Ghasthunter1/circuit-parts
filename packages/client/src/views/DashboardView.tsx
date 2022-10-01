import { useState } from "react";
import { useQuery } from "react-query";
import ProjectsDashboard from "~/components/dashboard/ProjectsDashboard";
import SelectProject from "~/components/dashboard/SelectProject";
import DashboardSkeleton from "~/components/skeletons/DashboardSkeleton";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchProjectComponents } from "~/services/projectsServices";

const DashboardView = () => {
  const [projectId, setProjectId] = useState<string>("");
  const projectComponentsQuery = useQuery(
    `/projects/${projectId}/components`,
    () => fetchProjectComponents(projectId),
    { enabled: projectId !== "" }
  );

  const data = projectComponentsQuery.data;

  const TopLeftContent = <div className="text-4xl font-bold">Dashboard</div>;
  const TopRightContent = (
    <div className="w-[350px]">
      <SelectProject projectId={projectId} setProjectId={setProjectId} />
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
