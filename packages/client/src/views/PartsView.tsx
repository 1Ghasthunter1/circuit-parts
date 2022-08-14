import PartsLayout from "../layouts/PartsLayout";
import { useQuery } from "react-query";
import { fetchParts } from "../services/partsServices";

const PartsView = () => {
  const { data, error, isError, isLoading } = useQuery("posts", fetchParts);
  console.log(data, error, isError, isLoading);
  return (
    <div>
      <PartsLayout />
    </div>
  );
};

export default PartsView;
