import PartsLayout from "../layouts/HeaderButtonTableLayout";
import { useParams } from "react-router";
import { useQuery, QueryKey } from "react-query";
import { fetchAssembly } from "../services/assemblyServices";
import CreateModal from "../components/modals/CreateModal";
import CreatePartForm from "../components/parts/CreatePartForm";
import PartsTable from "../components/parts/PartsTable";
import Button from "../elements/Button";
import { useState, useEffect } from "react";
import CreateAssemblyForm from "../components/assemblies/CreateAssemblyForm";

const AssemblyView = () => {
  const [partModalVis, setPartModalVis] = useState<boolean>(false);
  const [assyModalVis, setassyModalVis] = useState<boolean>(false);
  const { id } = useParams();

  if (!id) return null;
  
  const assemblyQueryKey: QueryKey = `assemblies/${id}`;
  const { data, refetch } = useQuery(assemblyQueryKey, () => fetchAssembly(id));

  //Refreshes page if routed to same route e.g. assemblies/id1 and asseblies/id2
  useEffect(() => {
    const refreshPage = async () => {
      await refetch();
    };
    refreshPage().catch(console.error);
  }, [id]);

  if (!data) {
    return null;
  }

  const assembly = data;
  const childComponents = assembly.children;
  const project = assembly.project;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const buttonStuff = (
    <div>
      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={() => setPartModalVis(true)}
      >
        New Part
      </Button>
      <CreateModal
        title="New Part"
        showModal={partModalVis}
        setShowModal={setPartModalVis}
        form={
          <CreatePartForm
            queriesToInvalidate={[assemblyQueryKey]}
            project={project}
            closeModal={() => setPartModalVis(false)}
          />
        }
      />

      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={() => setassyModalVis(true)}
      >
        New Assembly
      </Button>
      <CreateModal
        title="New Assembly"
        showModal={assyModalVis}
        setShowModal={setassyModalVis}
        form={
          <CreateAssemblyForm
            queriesToInvalidate={[assemblyQueryKey]}
            project={project}
            closeModal={() => setassyModalVis(false)}
          />
        }
      />
    </div>
  );

  return (
    <div>
      <PartsLayout
        pageTitle={
          assembly ? `${assembly.name} - Parts and Assemblies` : "loading..."
        }
        buttonContent={buttonStuff}
      >
        <PartsTable data={childComponents} />
      </PartsLayout>
    </div>
  );
};

export default AssemblyView;
