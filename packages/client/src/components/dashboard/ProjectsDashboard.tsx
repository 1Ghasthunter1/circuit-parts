import { Assembly } from "~/types/assemblyTypes";
import { Part } from "~/types/partsTypes";
import PartStatusBox from "../parts/PartStatusBox";

const ProjectsDashboard = ({
  components,
  filter,
}: {
  components: (Assembly | Part)[];
  filter: string;
}) => {
  const partStatuses = [
    ...new Set(
      components.filter((c) => c.type === "part").map((c) => c.status)
    ),
  ];
  const assemblyStatuses = [
    ...new Set(
      components.filter((c) => c.type === "assembly").map((c) => c.status)
    ),
  ];
  console.log(assemblyStatuses);

  return (
    <div>
      {partStatuses.map((status) => {
        return <div>{status}</div>;
      })}
      {assemblyStatuses.map((status) => {
        return <div>{status}</div>;
      })}
    </div>
  );
};

export default ProjectsDashboard;
