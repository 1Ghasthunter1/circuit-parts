import { useParams } from "react-router";
import { fetchPart } from "../services/partsServices";
import { useQuery } from "react-query";
import { Part } from "../types/partsTypes";
import PartTable from "../components/parts/PartTable";

const PartView = () => {
  const { id } = useParams();
  if (!id) return null;

  const partQuery = useQuery<Part>(`/parts/${id}`, () => fetchPart(id));
  const part = partQuery.data;

  if (!part) return null;

  return (
    <div className="m-8">
      <div className="text-4xl font-bold ">Part: {part.name}</div>
      <div className="text-gray-500">
        Part Number: <b>{part.partNumber}</b>
      </div>
      <PartTable part={part} />
    </div>
  );
};

export default PartView;
