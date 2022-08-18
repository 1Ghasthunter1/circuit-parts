import PartsLayout from "../layouts/HeaderButtonTableLayout";
import { useQuery } from "react-query";
import { fetchParts } from "../services/partsServices";
import PartsTable from "../components/parts/PartsTable";
import Button from "../elements/Button";

const PartsView = () => {
  const { data } = useQuery("parts", fetchParts);
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
        pageTitle="2022 Robot - Parts and Assemblies"
        buttonContent={buttonStuff}
      >
        <PartsTable data={data} />
      </PartsLayout>
    </div>
  );
};

export default PartsView;
