import { useParams } from "react-router";
import { fetchPart } from "../services/partsServices";
import { useQuery } from "react-query";
import { Part } from "../types/partsTypes";
import { ReactElement } from "react";
import PartTable from "../components/parts/PartTable";

const PartView = () => {
  let { id } = useParams();
  if (!id) {
    id = "";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isError, isLoading } = useQuery("part", () =>
    fetchPart(id)
  );

  const getContent = (data: Part | undefined): ReactElement => {
    if (data) {
      return (
        <div>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <PartTable part={data} />
        </div>
      );
    }
    return <h1>No Data :(</h1>;
  };

  return <div className="m-8">{getContent(data)}</div>;
};

export default PartView;
