import PartsLayout from "../layouts/HeaderButtonTableLayout";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchParts } from "../services/partsServices";
import { fetchProject } from "../services/projectsServices";

import PartsTable from "../components/parts/PartsTable";
import Button from "../elements/Button";

const ProjectView = () => {
  console.log("rendering here");
  let { id } = useParams();
  if (!id) {
    id = "";
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isError, isLoading } = useQuery("project", () =>
    fetchProject(id)
  );

  const project = data;

  const partsQuery = useQuery("posts", fetchParts);
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
        buttonContent={buttonStuff}
      >
        <PartsTable partsQuery={partsQuery} />
      </PartsLayout>
    </div>
  );
};

export default ProjectView;
