import PartsLayout from "../layouts/HeaderButtonTableLayout";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  fetchProject,
  fetchProjectComponents,
} from "../services/projectsServices";

import CreatePartModal from "../components/parts/createPartModal/CreatePartModal";
import PartsTable from "../components/parts/PartsTable";
import Button from "../elements/Button";

const ProjectView = () => {
  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isError, isLoading } = useQuery("project", () =>
    fetchProject(id)
  );

  const project = data;
  const partsQuery = useQuery(`parts`, () => fetchProjectComponents(id));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const buttonStuff = (
    <div>
      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
      >
        New Part
      </Button>
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
          project ? `${project.name} - Parts and Assemblies` : "loading..."
        }
        buttonContent={
          <div>
            <CreatePartModal />
          </div>
        }
      >
        <PartsTable data={partsQuery.data} />
      </PartsLayout>
    </div>
  );
};

export default ProjectView;
