import PartsLayout from "../layouts/HeaderButtonTableLayout";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchAssembly } from "../services/assemblyServices";
import CreateModal from "../components/modals/CreateModal";
import CreatePartForm from "../components/parts/CreatePartForm";
import PartsTable from "../components/parts/PartsTable";
import Button from "../elements/Button";
import { useState, useEffect } from "react";

const AssemblyView = () => {
  const [partModalVis, setPartModalVis] = useState<boolean>(false);
  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isError, isLoading, refetch } = useQuery(
    "assembly",
    () => fetchAssembly(id)
  );

  useEffect(() => {
    const doThing = async () => {
      await refetch();
    };
    doThing().catch(console.error);
  }, [id]);

  const assembly = data;
  const childComponents = assembly?.children;

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
        form={<CreatePartForm closeModal={() => setPartModalVis(false)} />}
      />

      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
      >
        New Assembly
      </Button>
    </div>
  );

  return (
    <div>
      <PartsLayout
        tableName={
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
