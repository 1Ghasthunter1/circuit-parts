import { useParams } from "react-router";
import { fetchPart } from "../services/partsServices";
import { useQuery } from "react-query";

const PartView = () => {
  let { id } = useParams();
  if (!id) {
    id = "";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isError, isLoading } = useQuery("parts", () =>
    fetchPart(id)
  );
  let content = <div></div>;
  if (data) {
    content = <h2>{data.name}</h2>;
  }

  return content;
};

export default PartView;
