import PartsLayout from "../layouts/PartsLayout";
import { useQuery } from "react-query";
import { fetchParts } from "../services/partsServices";
import PartsTable from "../components/parts/PartsTable";

const PartsView = () => {
  const partsQuery = useQuery("posts", fetchParts);
  return (
    <div>
      <PartsLayout tableName="2022 Robot - Parts and Assemblies">
        <PartsTable partsQuery={partsQuery} />
      </PartsLayout>
    </div>
  );
};

export default PartsView;
