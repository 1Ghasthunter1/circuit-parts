import { useParams } from "react-router";
import { useQuery } from "react-query";
import { useEffect } from "react";

import {
  fetchAssembly,
  fetchAssemblyComponents,
} from "../services/assemblyServices";

import NewComponentButtons from "../components/components/NewComponentButtons";
import TopLeftRightAndMiddle from "../layouts/TopLeftRightAndMiddle";
import ComponentsTable from "~/components/components/ComponentsTable";
import TopLeftCenterSkeleton from "~/components/skeletons/TopLeftCenterSkeleton";

const AssemblyView = () => {
  const { id } = useParams();

  if (!id) return null;

  const assemblyQuery = useQuery(`assemblies/${id}`, () => fetchAssembly(id));
  const assemblyComponentsQuery = useQuery(`assemblies/${id}/components`, () =>
    fetchAssemblyComponents(id)
  );

  //Refreshes page if routed to same route e.g. assemblies/id1 and asseblies/id2
  useEffect(() => {
    const refreshPage = async () => {
      await assemblyQuery.refetch();
    };
    refreshPage().catch(console.error);
  }, [id]);

  if (assemblyQuery.data) {
    const assembly = assemblyQuery.data;
    const project = assembly.project;

    const topLeftStuff = (
      <>
        <div className="text-4xl font-bold pb-2">Assembly: {assembly.name}</div>
        <div className="text-gray-400">
          Part Number: <b>{assembly.partNumber}</b>
        </div>
        <div className="text-gray-400">
          Creation Date:{" "}
          <b>{new Date(project.creationDate).toLocaleDateString("en-US")}</b>
        </div>
      </>
    );
    return (
      <TopLeftRightAndMiddle
        topLeftContent={topLeftStuff}
        topRightContent={
          <NewComponentButtons
            project={project}
            parent={assembly}
            queriesToInvalidate={[assemblyQuery, assemblyComponentsQuery]}
          />
        }
      >
        <ComponentsTable
          data={assemblyComponentsQuery.data || []}
          queryKeyToRefresh={`assemblies/${id}/components`}
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

export default AssemblyView;
