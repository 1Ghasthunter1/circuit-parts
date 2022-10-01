import { Assembly } from "~/types/assemblyTypes";
import { Part } from "~/types/partsTypes";
import StatusBox from "../components/StatusBox";
import TitleCard from "../components/TitleCard";
import PartStatusBox from "../parts/PartStatusBox";

const ProjectsDashboard = ({
  components,
  filter,
}: {
  components: (Assembly | Part)[];
  filter: string;
}) => {
  type ResultType = {
    [key in Assembly["status"] | Part["status"]]?: (Assembly | Part)[];
  };
  const mappedComponents = components.reduce(
    (result: ResultType, component) => ({
      ...result,
      [component.status]: [...(result[component.status] || []), component],
    }),
    {}
  );

  return (
    <div>
      {Object.entries(mappedComponents).map(([status, components]) => {
        return (
          <div key={status}>
            <div className="w-full">
              <StatusBox
                status={status as Assembly["status"] | Part["status"]}
              />
              <div className="bg-gray-50 shadow w-full h-24 mb-4 rounded-lg mt-1 p-2">
                <div className="flex flex-wrap mt-2 -ml-1 relative ">
                  {components.map((c) => (
                    <div key={c.id} className="mx-1 left-1">
                      <TitleCard component={c} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsDashboard;
